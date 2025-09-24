package com.ntra.progigs.Configration;

import com.ntra.progigs.Filter.JwtAuthenticationFilter;

import com.ntra.progigs.Service.ServiceImpl.UserImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity

public class SecurityConfig {
    private final UserImpl userDetailsImp;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOriginPattern("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }

    public SecurityConfig(UserImpl userDetailsImp, JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.userDetailsImp = userDetailsImp;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }
    private static final String[] Client_URL= {"/user/**","/jobs/addjobs/**", "jobs/manage-jobs/**",
    };

    private static final String[] Frelancer_URL= {"jobs/alljobs/**","jobs/jobbyskill/{skill}/**",
            "jobs/jobbyskills/**", "jobs/appliedJobs/**","/jobs-by-catogory/{catogory}/**"
    };

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(
                        Req->Req.requestMatchers("/login/**","/register/**","/v3/api-docs",
                                        "/v2/api-docs","/swagger-resources/**", "/swagger-ui/**",
                                        "/profile/top-six-freelancer",

                                        "/webjars/**","/api-docs/**","/verify-otp","jobs/five-jobs/**" ,"/ws/**","/user/top-Freelancer")
                                .permitAll()
                                .requestMatchers(Client_URL).hasAuthority("CLIENT")
                                .requestMatchers(Frelancer_URL).hasAuthority("FREELANCER")
                                .anyRequest()
                                .authenticated())
                .userDetailsService(userDetailsImp)
                .sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}
