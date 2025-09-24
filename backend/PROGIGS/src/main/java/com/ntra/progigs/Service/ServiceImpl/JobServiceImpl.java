package com.ntra.progigs.Service.ServiceImpl;

import com.ntra.progigs.DTOs.JobDto;
import com.ntra.progigs.DTOs.JobDtoForCard;
import com.ntra.progigs.Entity.*;
import com.ntra.progigs.Filter.GetAuthenticatedUser;
import com.ntra.progigs.Mapper.JobMapper;
import com.ntra.progigs.Repository.JobRepo;
import com.ntra.progigs.Repository.ProfileRepo;
import com.ntra.progigs.Repository.ProposalsRepo;
import com.ntra.progigs.Repository.UserRepo;
import com.ntra.progigs.Service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private ProfileRepo profileRepo;
    @Autowired
    private JobRepo jobRepo;
    @Autowired
    private JobMapper jobMapper;
@Autowired
    private GetAuthenticatedUser getAuthenticatedUser;
    @Autowired
    private ProposalsRepo proposalsRepo;


    @Override
    public JobDto saveJob(JobDto jobs) {
        User user = getAuthenticatedUser.getAuthenticatedUser();
        Jobs job = jobMapper.MapToJob(jobs);
        job.setUser(user);
        jobRepo.save(job);
        JobDto jobDto = jobMapper.MapToDto(job);
        return jobDto;
    }

    public List<JobDtoForCard> getAllJobs (){

        List<Jobs> jobs = jobRepo.findAll();
        return jobs.stream().map(jobMapper::MapToJobDtoforCard).toList();
    }

    @Override
    public List<JobDtoForCard> getFiveJobs() {
        PageRequest pageRequest = PageRequest.of(0, 4, Sort.by(Sort.Direction.DESC, "id"));
        List<Jobs> jobs = jobRepo.findAll(pageRequest).getContent();
        return jobs.stream().map(jobMapper::MapToJobDtoforCard).toList();
    }


    public JobDto getJobBYID(int id) {

        Jobs jobs = this.jobRepo.findById(id);
        return this.jobMapper.MapToDto1(jobs);
    }

    public List<JobDto> getJobByskillRequired(String skills) {
        List<Jobs> jobs = this.jobRepo.findBySkillsRequired(skills);
        return jobs.stream().map(jobMapper::MapToDto1).toList();
    }

    @Override
    public List<JobDtoForCard> findJobByLocation(String country) {
//        List<User> user=userRepo.findByCountry(country, CLIENT);
//        List<Jobs> jobs = new ArrayList<>();
//        for (User u : user) {
//            jobs.addAll(u.getJobs());
//        }
        List<Jobs> jobs = jobRepo.findByLocation(country);
        return jobs.stream().map(jobMapper::MapToJobDtoforCard).toList();
    }

    public List<JobDto> getJobBySkillsRequired(List<String> skills) {
        List<Jobs> jobs = this.jobRepo.findBySkillsRequiredIn(skills);
        List<JobDto> jobDtos = jobs.stream().map(jobMapper::MapToDto).toList();
        return jobDtos;
    }

    @Override
    public JobDto editeJob(JobDto jobs, int id) {
        Jobs jobs1 = jobRepo.findById(id);
        jobs1.setTitle(jobs.getTitle());
        jobs1.setDescription(jobs.getDescription());
        jobs1.setSkillsRequired(jobs.getSkillsRequired());
        jobs1.setDuration(jobs.getDuration());
        jobs1.setAmount(jobs.getAmount());
        jobs1.setPayout_methods(jobs.getPayout_methods());
        jobs1.setModules(jobs.getModules());
        jobs1.setStatus(jobs.getStatus());
        return jobMapper.MapToDto(jobRepo.save(jobs1));
    }

    public void deletebyid(int id) {
        jobRepo.deleteById(id);
    }

    @Override
    public List<JobDtoForCard> findByCatogory(String catogory) {

        if (catogory.equals("Website jobs") || catogory.equals("Software Development jobs") || catogory.equals("SEO jobs") || catogory.equals("Development & IT")|| catogory.equals("Programming & Tech"))

            {
                List<String> skills = Arrays.asList("HTML", "CSS", "JavaScript", "React", "Angular", "Vue", "Java", "Python", "C++", "C#", "PHP", "Spring", "Laravel", "Django", "Flask","Three.js");
                List<Jobs> jobs = jobRepo.findBySkillsRequiredIn(skills);
                return jobs.stream().map(jobMapper::MapToJobDtoforCard).toList();
            }
            else if (catogory.equals("Gaphic Design jobs")|| catogory.equals("Design & Creative")) {
                List<String> skills = Arrays.asList("Photoshop", "Illustrator", "InDesign",
                        "Premiere Pro", "After Effects","Logo Designing");
                List<Jobs> jobs = jobRepo.findBySkillsRequiredIn(skills);
                return jobs.stream().map(jobMapper::MapToJobDtoforCard).toList();
            }
            else if (catogory.equals("Mobile App development ")) {
                List<String> skills = Arrays.asList("Swift", "Objective-C", "Java", "Kotlin", "Flutter");
                List<Jobs> jobs = jobRepo.findBySkillsRequiredIn(skills);
                return jobs.stream().map(jobMapper::MapToJobDtoforCard).toList();
            } else if (catogory.equals("Data Entry jobs") || catogory.equals("Writing jobs")) {
                List<String> skills = Arrays.asList("Excel", "Word", "PowerPoint", "Access");
                List<Jobs> jobs = jobRepo.findBySkillsRequiredIn(skills);
                return jobs.stream().map(jobMapper::MapToJobDtoforCard).toList();

            } else if (catogory.equals("Internet Marketing jobs")|| catogory.equals("Digital Marketing")) {

                List<String> skills = Arrays.asList("SEO", "PPC", "Social Media", "Email Marketing");
                List<Jobs> jobs = jobRepo.findBySkillsRequiredIn(skills);
                return jobs.stream().map(jobMapper::MapToJobDtoforCard).toList();
            } else if (catogory.equals("Legal jobs")) {
                List<String> skills = Arrays.asList("Legal", "Contracts", "Litigation");
                List<Jobs> jobs = jobRepo.findBySkillsRequiredIn(skills);
                return jobs.stream().map(jobMapper::MapToJobDtoforCard).toList();
            } else if (catogory.equals("Finance jobs")) {
                List<String> skills = Arrays.asList("Accounting", "Finance", "Taxation");
                List<Jobs> jobs = jobRepo.findBySkillsRequiredIn(skills);
                return jobs.stream().map(jobMapper::MapToJobDtoforCard).toList();
            }else if (catogory.equals("Writing & Translation")) {
            List<String> skills = Arrays.asList("Writing", "Translation");
            List<Jobs> jobs = jobRepo.findBySkillsRequiredIn(skills);
            return jobs.stream().map(jobMapper::MapToJobDtoforCard).toList();
        }else if (catogory.equals("Music & Audio")) {
            List<String> skills = Arrays.asList("Music", "Audio", "Sound");
            List<Jobs> jobs = jobRepo.findBySkillsRequiredIn(skills);
            return jobs.stream().map(jobMapper::MapToJobDtoforCard).toList();
        } else if (catogory.equals("Video & Animation")) {
            List<String> skills = Arrays.asList("Video", "Animation", "Graphics");
            List<Jobs> jobs = jobRepo.findBySkillsRequiredIn(skills);
            return jobs.stream().map(jobMapper::MapToJobDtoforCard).toList();
        }else {
                throw new RuntimeException("Invalid catogory");
            }


    }

        @Override
        public List<JobDtoForCard> appliedJobsForFreelancer () {
            String freelancer = getAuthenticatedUser.getAuthenticatedUser().getUsername();

            if (!"FREELANCER".equalsIgnoreCase(String.valueOf(userRepo.findByUsername(freelancer).getRole()))) {
                throw new RuntimeException("You are not a freelancer");
            }

            List<Proposals> proposals = proposalsRepo.findAllProposalsByFreelancerName(freelancer);
            Set<Integer> jobIds = new HashSet<>();  // Tracks unique job IDs

            List<JobDtoForCard> jobDtoForCards = new ArrayList<>();

            for (Proposals proposal : proposals) {
                Jobs job = jobRepo.findByProposals(proposal);
                Integer jobId = job.getId();

                if (jobIds.add(jobId)) { // Add only if it's a new job ID

                    jobDtoForCards.add(jobMapper.MapToJobDtoforCard(job));
                }
            }

            return jobDtoForCards;
        }
        @Override
        public List<JobDtoForCard> myJobs () {
            User user = getAuthenticatedUser.getAuthenticatedUser();
            List<Jobs> jobs = jobRepo.findByUser(user);
            return jobs.stream().map(jobMapper::MapToJobDtoforCard).toList();
        }
    @Override
    public List<JobDtoForCard> searchJobs(String keyword) {
        return jobRepo.searchJobs(keyword).stream().map(jobMapper::MapToJobDtoforCard).toList();
    }
    }
/*
    @Override
    public List<JobDtoForCard> jobsByLocation(String location) {
       List <Profile> profile = profileRepo.findAllByLocation(location);
       List<JobDtoForCard> jobDtoForCards = new ArrayList<>();
       for (Profile p : profile) {
           User user = p.getUser();
           user.getJobs().forEach(job -> jobDtoForCards.add(jobMapper.MapToJobDtoforCard(job)));
       }
        return jobDtoForCards;
    }*/



/*    @Override
    public List<JobDto> HiredJobsForFreelancer() {
        String freelancer = getAuthenticatedUser().getUsername();

        if (!"FREELANCER".equalsIgnoreCase(String.valueOf(userRepo.findByUsername(freelancer).getRole()))) {
            throw new RuntimeException("You are not a freelancer");
        }

        List<Proposals> proposals = proposalsRepo.findHiredProposalsByFreelancerName(freelancer);

        Set<Integer> jobIds = new HashSet<>();  // Tracks unique job IDs
        List<JobDto> jobDtos = new ArrayList<>();

        for (Proposals proposal : proposals) {
            Jobs job = jobRepo.findByProposals(proposal);
            Integer jobId = job.getId();

            if (jobIds.add(jobId)) { // Add only if it's a new job ID
                jobDtos.add(jobMapper.MapToDto(job));
            }
        }

        return jobDtos;

    }
}*/

/*
    initial logic for appliedJobsForFreelancer

    public List<JobDto> appliedJobsForFreelancer() {
        String freelancer = getAuthenticatedUser().getUsername();
        if ("FREELANCER".equalsIgnoreCase(String.valueOf(userRepo.findByUsername(freelancer).getRole()))) {
            List<Proposals> proposals = proposalsRepo.findAllProposalsByFreelancerName(freelancer);
            List<JobDto> jobDtos = new ArrayList<>();
            Map<Integer, JobDto> jobDtoMap = new HashMap<>();

            for (Proposals proposal : proposals) {
                Jobs job = jobRepo.findByProposals(proposal);
                jobDtos.add(jobMapper.MapToDto(job));
                Integer jobId = job.getId();
                if (!jobDtoMap.containsKey(jobId)) { // Add only if it's not already present
                    jobDtoMap.put(jobId, jobMapper.MapToDto(job));
                }
            }
            return jobDtos;
        }else {
            throw new RuntimeException("You are not a freelancer");
        }

    }*/
