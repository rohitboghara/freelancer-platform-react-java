package com.ntra.progigs.Repository;

import com.ntra.progigs.Entity.Profile;
import com.ntra.progigs.Entity.User;
import com.ntra.progigs.Entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {
    User findByUsername(String username);
    List<User> findAllByRole(UserRole role);
    @Query(value = "SELECT DISTINCT u.* " +
            "FROM user u " +
            "JOIN demo1.profile p ON u.profile_id = p.id " +
            "LEFT JOIN demo1.profile_skills ps ON p.id = ps.profile_id " +
            "WHERE u.role = :role " +
            "AND ( " +
            "   LOWER(p.field_of_work) LIKE LOWER(CONCAT('%', :input, '%')) " +
            "   OR LOWER(ps.skills) LIKE LOWER(CONCAT('%', :input, '%')) " +
            "   OR ( :input = 'Graphic designers' AND ( " +
            "         LOWER(ps.skills) LIKE '%adobe photoshop%' " +
            "         OR LOWER(ps.skills) LIKE '%illustrator%' " +
            "         OR LOWER(ps.skills) LIKE '%branding%' " +
            "         OR LOWER(ps.skills) LIKE '%figma%' " +
            "         OR LOWER(p.field_of_work) LIKE '%graphic designer%' " +
            "   )) " +
            "   OR ( :input = 'Development & IT' AND ( " +
            "         LOWER(p.field_of_work) LIKE '%development%' " +
            "         OR LOWER(p.field_of_work) LIKE '%it%' " +
            "         OR LOWER(ps.skills) LIKE '%java%' " +
            "         OR LOWER(ps.skills) LIKE '%python%' " +
            "         OR LOWER(ps.skills) LIKE '%c++%' " +
            "         OR LOWER(ps.skills) LIKE '%networking%' " +
            "   )) " +
            "   OR ( :input = 'Design & Creative' AND ( " +
            "         LOWER(p.field_of_work) LIKE '%design%' " +
            "         OR LOWER(p.field_of_work) LIKE '%creative%' " +
            "         OR LOWER(ps.skills) LIKE '%graphic design%' " +
            "         OR LOWER(ps.skills) LIKE '%photoshop%' " +
            "         OR LOWER(ps.skills) LIKE '%illustrator%' " +
            "         OR LOWER(ps.skills) LIKE '%ui/ux%' " +
            "   )) " +
            "   OR ( :input = 'Digital Marketing' AND ( " +
            "         LOWER(p.field_of_work) LIKE '%marketing%' " +
            "         OR LOWER(p.field_of_work) LIKE '%digital%' " +
            "         OR LOWER(ps.skills) LIKE '%seo%' " +
            "         OR LOWER(ps.skills) LIKE '%google ads%' " +
            "         OR LOWER(ps.skills) LIKE '%social media%' " +
            "         OR LOWER(ps.skills) LIKE '%email marketing%' " +
            "   )) " +
            "   OR ( :input = 'Writing & Translation' AND ( " +
            "         LOWER(p.field_of_work) LIKE '%writing%' " +
            "         OR LOWER(p.field_of_work) LIKE '%translation%' " +
            "         OR LOWER(ps.skills) LIKE '%content writing%' " +
            "         OR LOWER(ps.skills) LIKE '%proofreading%' " +
            "         OR LOWER(ps.skills) LIKE '%blogging%' " +
            "         OR LOWER(ps.skills) LIKE '%copywriting%' " +
            "   )) " +
            "   OR ( :input = 'Music & Audio' AND ( " +
            "         LOWER(p.field_of_work) LIKE '%music%' " +
            "         OR LOWER(p.field_of_work) LIKE '%audio%' " +
            "         OR LOWER(ps.skills) LIKE '%audio editing%' " +
            "         OR LOWER(ps.skills) LIKE '%music production%' " +
            "         OR LOWER(ps.skills) LIKE '%sound engineering%' " +
            "   )) " +
            "   OR ( :input = 'Video & Animation' AND ( " +
            "         LOWER(p.field_of_work) LIKE '%video%' " +
            "         OR LOWER(p.field_of_work) LIKE '%animation%' " +
            "         OR LOWER(ps.skills) LIKE '%video editing%' " +
            "         OR LOWER(ps.skills) LIKE '%after effects%' " +
            "         OR LOWER(ps.skills) LIKE '%motion graphics%' " +
            "   )) " +
            "   OR ( :input = 'Programming & Tech' AND ( " +
            "         LOWER(p.field_of_work) LIKE '%programming%' " +
            "         OR LOWER(p.field_of_work) LIKE '%tech%' " +
            "         OR LOWER(ps.skills) LIKE '%java%' " +
            "         OR LOWER(ps.skills) LIKE '%python%' " +
            "         OR LOWER(ps.skills) LIKE '%nodejs%' " +
            "         OR LOWER(ps.skills) LIKE '%react%' " +
            "   )) " +
            "   OR ( :input = 'Software developers' AND ( " +
            "         LOWER(ps.skills) LIKE '%java%' " +
            "         OR LOWER(ps.skills) LIKE '%spring boot%' " +
            "         OR LOWER(ps.skills) LIKE '%python%' " +
            "         OR LOWER(ps.skills) LIKE '%django%' " +
            "         OR LOWER(p.field_of_work) LIKE '%software developer%' " +
            "   )) " +
            "   OR ( :input = 'Website designers' AND ( " +
            "         LOWER(ps.skills) LIKE '%html%' " +
            "         OR LOWER(ps.skills) LIKE '%css%' " +
            "         OR LOWER(ps.skills) LIKE '%javascript%' " +
            "         OR LOWER(ps.skills) LIKE '%react%' " +
            "         OR LOWER(ps.skills) LIKE '%wordpress%' " +
            "         OR LOWER(p.field_of_work) LIKE '%website designer%' " +
            "   )) " +
            "   OR ( :input = '3D artists' AND ( " +
            "         LOWER(ps.skills) LIKE '%blender%' " +
            "         OR LOWER(ps.skills) LIKE '%3d modeling%' " +
            "         OR LOWER(ps.skills) LIKE '%texturing%' " +
            "         OR LOWER(p.field_of_work) LIKE '%3d artist%' " +
            "   )) " +
            "   OR ( :input = 'Mobile app developers' AND ( " +
            "         LOWER(ps.skills) LIKE '%flutter%' " +
            "         OR LOWER(ps.skills) LIKE '%react native%' " +
            "         OR LOWER(ps.skills) LIKE '%android%' " +
            "         OR LOWER(p.field_of_work) LIKE '%mobile app developer%' " +
            "   )) " +
            "   OR ( :input = 'Illustration' AND ( " +
            "         LOWER(ps.skills) LIKE '%illustration%' " +
            "         OR LOWER(ps.skills) LIKE '%digital illustration%' " +
            "         OR LOWER(p.field_of_work) LIKE '%illustrator%' " +
            "   )) " +
            "   OR ( :input = 'Web developers' AND ( " +
            "         LOWER(ps.skills) LIKE '%html%' " +
            "         OR LOWER(ps.skills) LIKE '%css%' " +
            "         OR LOWER(ps.skills) LIKE '%javascript%' " +
            "         OR LOWER(ps.skills) LIKE '%react%' " +
            "         OR LOWER(p.field_of_work) LIKE '%web developer%' " +
            "   )) " +
            "   OR ( :input = 'Java' AND ( " +
            "         LOWER(ps.skills) LIKE '%java%' " +
            "         OR LOWER(p.field_of_work) LIKE '%java developer%' " +
            "   )) " +
            "   OR ( :input = 'Spring boot' AND ( " +
            "         LOWER(ps.skills) LIKE '%spring boot%' " +
            "         OR LOWER(p.field_of_work) LIKE '%spring boot developer%' " +
            "   )) " +
            "   OR ( :input = 'SEO specialists' AND ( " +
            "         LOWER(ps.skills) LIKE '%seo%' " +
            "         OR LOWER(p.field_of_work) LIKE '%seo specialist%' " +
            "   )) " +
            "   OR ( :input = 'Data entry clerks' AND ( " +
            "         LOWER(p.field_of_work) LIKE '%data entry%' " +
            "   )) " +
            "   OR ( :input = 'Virtual assistants' AND ( " +
            "         LOWER(p.field_of_work) LIKE '%virtual assistant%' " +
            "   )) " +
            "   OR ( :input = 'Translators' AND ( " +
            "         LOWER(p.field_of_work) LIKE '%translator%' " +
            "   )) " +
            "   OR ( :input = 'Financial experts' AND ( " +
            "         LOWER(p.field_of_work) LIKE '%financial expert%' " +
            "   )) " +
            "   OR ( :input = 'Manufacturers' AND ( " +
            "         LOWER(p.field_of_work) LIKE '%manufacturer%' " +
            "   )) " +
            "   OR ( :input = 'Logistics experts' AND ( " +
            "         LOWER(p.field_of_work) LIKE '%logistics expert%' " +
            "   )) " +
            "   OR ( :input = 'Fashion designers' AND ( " +
            "         LOWER(p.field_of_work) LIKE '%fashion designer%' " +
            "   )) " +
            ")", nativeQuery = true)
    List<User> findBySkillOrFieldOfWork(@Param("input") String input, @Param("role") String role);


    @Query("SELECT u FROM User u JOIN u.profile p " +
            "WHERE LOWER(p.Location) LIKE LOWER(CONCAT('%', :country, '%')) " +
            "AND u.role = :role")
    List<User> findByCountry(@Param("country") String country, UserRole role);

    @Query("SELECT DISTINCT u FROM User u " +
            "JOIN u.profile p " +
            "LEFT JOIN p.skills ps " +
            "WHERE LOWER(u.username) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(p.Location) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(ps) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(p.fieldOfWork) LIKE LOWER(CONCAT('%', :keyword, '%')) "+
            "OR LOWER(p.firstName) LIKE LOWER(CONCAT('%', :keyword, '%')) "+
            "OR LOWER(p.lastName) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "  OR LOWER(CONCAT(p.firstName, ' ', p.lastName)) LIKE LOWER(CONCAT('%', :keyword, '%'))"+
            "AND u.role = :role")
    List<User> searchUsers(@Param("keyword") String keyword,@Param("role") UserRole role);

    @Query("SELECT DISTINCT u FROM User u " +
            "JOIN u.profile p "+
            " WHERE LOWER(p.Location) NOT LIKE LOWER(CONCAT('%', :country, '%'))"+
            "AND u.role = :role")
    List<User> findByNotCountry(@Param("country") String country,@Param("role") UserRole role);

    User findByProfile(Profile profile);




}
