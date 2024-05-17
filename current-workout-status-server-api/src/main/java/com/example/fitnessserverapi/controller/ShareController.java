package com.example.fitnessserverapi.controller;


import com.example.fitnessserverapi.repository.ShareRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import com.example.fitnessserverapi.model.ShareWork;
import com.example.fitnessserverapi.repository.WorkoutRepository;

@RestController
@CrossOrigin(origins = "http://localhost:5173",methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, allowedHeaders = "*")
@RequestMapping("/api")
public class ShareController {


    // Autowire WorkoutRepository
    private final ShareRepository shareRepository;

    @Autowired
    public ShareController(ShareRepository shareRepository) {
        this.shareRepository = shareRepository;
    }

    // Endpoint to retrieve all workouts
    @GetMapping("/Workoutt")
    public ResponseEntity<List<ShareWork>> getAllWorkout() {return ResponseEntity.ok(this.shareRepository.findAll());
    }

    // Endpoint to create a new workout
    @PostMapping("/CreateWorkoutt")
    public ResponseEntity<ShareWork> createWorkout(@RequestBody ShareWork workout) {
        // Save the new workout and return it with status 201 Created
        return ResponseEntity.status(201).body(this.shareRepository.save(workout));
    }

    // Endpoint to retrieve a workout by its ID
    @GetMapping("/Workoutt/{id}")
    public ResponseEntity getWorkoutByID(@PathVariable String id) {
        Optional<ShareWork> optionalWorkout = this.shareRepository.findById(id);

        if (optionalWorkout.isPresent()) {
            // If the workout is found, return it
            return ResponseEntity.ok(optionalWorkout.get());
        } else {
            // If the workout is not found, return a message
            return ResponseEntity.ok("The workout with ID " + id + " was not found");
        }
    }


    // Endpoint to delete a workout by its ID
    @DeleteMapping("/WorkoutDeletee/{id}")
    public ResponseEntity deleteWorkoutByID(@PathVariable String id) {
        Optional<ShareWork> optionalWorkout = this.shareRepository.findById(id);

        if (optionalWorkout.isPresent()) {
            // If the workout is found, delete it and return a success message
            this.shareRepository.deleteById(id);
            return ResponseEntity.ok().body("{\"message\": \"Workout with ID " + id + " deleted successfully\"}");
        } else {
            // If the workout is not found, return a message
            return ResponseEntity.ok().body("{\"message\": \"The workout with ID " + id + " was not found\"}");
        }
    }


    // Endpoint to update a workout by its ID
    @PutMapping("/WorkoutUpp/{id}")
    public ResponseEntity<?> updateWorkout(@PathVariable String id, @RequestBody ShareWork updatedWorkout) {
        Optional<ShareWork> optionalWorkout = this.shareRepository.findById(id);
        if (optionalWorkout.isPresent()) {
            // If the workout is found, update its values and return the updated workout
            ShareWork  workout = optionalWorkout.get();
            workout.setWorkoutState(updatedWorkout.getWorkoutState());
            workout.setDescription(updatedWorkout.getDescription());
            return ResponseEntity.ok(this.shareRepository.save(workout));
        } else {
            // If the workout is not found, return 404 Not Found
            return ResponseEntity.notFound().build();
        }
    }



}
