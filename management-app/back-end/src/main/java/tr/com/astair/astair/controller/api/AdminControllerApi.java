package tr.com.astair.astair.controller.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.com.astair.astair.model.Admin;
import tr.com.astair.astair.model.Slots;

import java.util.List;

public interface AdminControllerApi {
    @GetMapping("/meeting/get-slots/")
    ResponseEntity<List<Admin>> getSlots();

    @PostMapping("/admin/set-slots/")
    ResponseEntity<Admin> setSlots(@RequestBody Admin a);

    @PostMapping("/admin/set-slots-only-slots/")
    ResponseEntity<Admin> setSlotsOnlySlots(@RequestBody Slots s);

}
