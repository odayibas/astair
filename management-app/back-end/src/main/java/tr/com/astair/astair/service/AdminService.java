package tr.com.astair.astair.service;

import tr.com.astair.astair.model.Admin;
import java.util.List;

public interface AdminService {
    List<Admin> getSlots();
    Admin setSlots(String beginSlot, String durationSlot, String finishSlot);
    Admin setSlots(Admin a);
}
