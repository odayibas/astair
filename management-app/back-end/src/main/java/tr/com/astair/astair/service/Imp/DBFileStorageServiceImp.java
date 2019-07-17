package tr.com.astair.astair.service.Imp;

import tr.com.astair.astair.exception.FileStorageException;
import tr.com.astair.astair.exception.MyFileNotFoundException;
import tr.com.astair.astair.model.DBFile;
import tr.com.astair.astair.repository.DBFileRepository;
import tr.com.astair.astair.service.DBFileStorageService;

import org.hibernate.QueryException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@Service
public class DBFileStorageServiceImp implements DBFileStorageService {

    @Autowired
    private DBFileRepository dbFileRepository;

    public DBFile storeFile(MultipartFile file) {
        // Normalize file name
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // Check if the file's name contains invalid characters
            if(fileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            DBFile dbFile = new DBFile(fileName, file.getContentType(), file.getBytes());

            return dbFileRepository.save(dbFile);
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public DBFile getFile(String fileId) {
        return dbFileRepository.findById(fileId)
        		.orElseThrow(() -> new MyFileNotFoundException("File not found with id " + fileId));
    }
    
    public List<DBFile> get() {
        try {
            return dbFileRepository.findAll();
        } catch (QueryException e) {
            throw new QueryException(e.getMessage());
        }
    }
    
}
