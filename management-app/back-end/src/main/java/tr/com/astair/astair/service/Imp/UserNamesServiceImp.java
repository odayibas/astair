package tr.com.astair.astair.service.Imp;

import org.hibernate.QueryException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tr.com.astair.astair.model.UserNames;
import tr.com.astair.astair.repository.UserNamesRepository;
import tr.com.astair.astair.service.UserNamesService;
import java.util.List;

@Service
public class UserNamesServiceImp implements UserNamesService {
    private UserNamesRepository userNamesRepository ;
    @Autowired
    public UserNamesServiceImp(UserNamesRepository userNamesRepository)
    {
        this.userNamesRepository = userNamesRepository;
    }
    public List<UserNames> getNames() {
        try {
            return userNamesRepository.getNames();
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

    public UserNames addUserName(UserNames userName){
        try {
            return userNamesRepository.save(userName);
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }

}
