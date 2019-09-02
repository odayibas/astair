package tr.com.astair.astair.service.Imp;

import org.hibernate.QueryException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tr.com.astair.astair.model.Admin;
import tr.com.astair.astair.repository.AdminRepository;
import tr.com.astair.astair.service.AdminService;

import java.util.List;

@Service
public class AdminServiceImp implements AdminService {
    private AdminRepository adminRepository;
    @Autowired
    public AdminServiceImp(AdminRepository adminRepository)
    {
        this.adminRepository = adminRepository;
    }
    public List<Admin> getSlots() {
        try {
            return adminRepository.getSlots();
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

    public Admin setSlots(String beginSlot, String durationSlot, String finishSlot){
        try {
            Admin admin = new Admin("", beginSlot, durationSlot, finishSlot, "");
            return adminRepository.save(admin);
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

    public Admin setSlots(Admin a){
        try {
            return adminRepository.save(a);
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

}
