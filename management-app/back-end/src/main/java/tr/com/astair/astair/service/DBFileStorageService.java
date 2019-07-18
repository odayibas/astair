package tr.com.astair.astair.service;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;

import tr.com.astair.astair.model.DBFile;

public interface DBFileStorageService {
	DBFile storeFile(MultipartFile file);
	DBFile getFile(String fileId);
	List<DBFile> get();
}
