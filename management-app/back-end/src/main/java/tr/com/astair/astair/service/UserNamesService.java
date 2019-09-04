package tr.com.astair.astair.service;

import tr.com.astair.astair.model.UserNames;
import java.util.List;

public interface UserNamesService {
    List<UserNames> getNames();
    void addUserName(UserNames userName);
}
