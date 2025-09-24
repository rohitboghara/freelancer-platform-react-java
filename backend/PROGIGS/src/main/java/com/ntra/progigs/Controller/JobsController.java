package com.ntra.progigs.Controller;

import com.ntra.progigs.DTOs.JobDto;
import com.ntra.progigs.DTOs.JobDtoForCard;
import com.ntra.progigs.Service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/jobs")
public class JobsController {
    private final JobService jobService;
    @GetMapping("/five-jobs")
    public List<JobDtoForCard> getfiveJobs(){

        return jobService.getFiveJobs();
    }

    @PostMapping("/addjobs")
    public JobDto addjobs(@RequestBody JobDto jobs){

        return   jobService.saveJob(jobs);
    }
    @GetMapping("/alljobs")
    public ResponseEntity<List<JobDtoForCard>> getAllJobs()
    {   List<JobDtoForCard> list = jobService.getAllJobs();
        if(list.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        else{
            return ResponseEntity.of(Optional.of(list));
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<JobDto> findbyJobId(@PathVariable int id) {
        JobDto jobDto=jobService.getJobBYID(id);
        if(jobDto==null){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        else {
            return ResponseEntity.of(Optional.of(jobDto));
        }
    }

    @GetMapping("/jobs-by-catogory/{catogory}")
    public ResponseEntity<List<JobDtoForCard>> findJobsByCatogory(@PathVariable String catogory) {
        List<JobDtoForCard> jobs=jobService.findByCatogory(catogory);
        return ResponseEntity.of(Optional.of(jobs));
    }
    @GetMapping("/appliedJobs")
    public ResponseEntity<List<JobDtoForCard>> findAppliedJobs() {
        List<JobDtoForCard> jobs=jobService.appliedJobsForFreelancer();
        if(jobs==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        else {
            return ResponseEntity.of(Optional.of(jobs));
        }
    }

    @GetMapping("/jobbyskill/{skill}")
    public ResponseEntity<List<JobDto>> findJobbySkills(@PathVariable String skill) {
        List<JobDto> jobs=jobService.getJobByskillRequired(skill);
        if(jobs==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        else {
            return ResponseEntity.of(Optional.of(jobs));
        }
    }
    @GetMapping("/jobbyskills")
    public ResponseEntity<List<JobDto>> findJobBySkills(@RequestParam(value = "skill") List<String> skill) {
        List<JobDto> jobs=jobService.getJobBySkillsRequired(skill);
        if(jobs==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        else {
            return ResponseEntity.of(Optional.of(jobs));
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<JobDto> updateJobsStatus(@RequestBody JobDto jobs,@PathVariable int id){
    return ResponseEntity.of(Optional.of(jobService.editeJob(jobs,id)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJobs(@PathVariable int id){
        jobService.deletebyid(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/manage-jobs")
    public ResponseEntity<List<JobDtoForCard>> getMyJobs(){
        return ResponseEntity.of(Optional.of(jobService.myJobs()));
    }
    @GetMapping("/jobs-by-location/{location}")
    public List<JobDtoForCard> getJobsByLocation(@PathVariable String location){
        return jobService.findJobByLocation(location);
    }

    @GetMapping("/search-jobs")
    public List<JobDtoForCard> searchJob(@RequestParam("keyword") String keyword){
        return jobService.searchJobs(keyword);
    }
}
/*@GetMapping("/hiredJobs")
    public ResponseEntity<List<JobDto>> hiredJobs() {
        List<JobDto> jobs=jobService.HiredJobsForFreelancer();
        if(jobs==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        else {
            return ResponseEntity.of(Optional.of(jobs));
        }
    }*/


