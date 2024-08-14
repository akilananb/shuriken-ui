package com.nomura.shuriken.assetquerysvc.repository;

import com.nomura.shuriken.assetquerysvc.repository.entities.MultiUmdUploadResponseEntity;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MultiUmdUploadResponseRepository extends JpaRepository<MultiUmdUploadResponseEntity, String> {
    Optional<MultiUmdUploadResponseEntity> findByPdpIdAndCreatedDate(String pdpId, Date currentDate);

    @Query("select m from MultiUmdUploadResponseEntity m where m.pdpId in ?1 and m.createdDate = ?2")
    List<MultiUmdUploadResponseEntity> findByPdpIdInAndCreatedDate(List<String> pdpIds, Date createdDate);
}
