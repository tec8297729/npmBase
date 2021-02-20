import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Upload } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { cloneDeep, isEmpty, floor } from 'lodash-es';
import { RcFile, UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import ImgViewer, { ImgViewerRef } from './ImgViewer';
import {
  imageVolumeCheck,
  imgSizeCheck,
  imageMaxSizeCheck,
  getBase64,
  generateQiniuImgUrlKey,
  getQiniuFileUrl,
} from './img_tool';
import { QiniuOSSUploadProps, UploadValueData, FileListItem } from './typeData';
import styles from './index.module.less';

/*
多图七牛上传组件，多功能配置参数，默认为多图模式
<Form.Item label="Photos" name="photos">
  <QiniuOSSUpload
    token={token}
    multiple={true} // 是否支持多选图片
    accept="image/*" // 上传文件类型限制
    hideViewIcon={false} // 是否隐藏查看icon按钮
    hideDelIcon={false} // 是否隐藏删除icon按钮
    imageSize={[300, 100]} // img 尺寸 [宽，高]
    // 限制图片体积大小
    imageVolume={{
      type: 'M', // 单位
      fileSize: 10, // 10MB
    }}
    allDoneCallback={fileList=>{}} // 全部上传完回调
    percentCallback={(value, errorLen) => {}} // 上传进度回调
    isImageDesc={true} // 开始右侧描述
    imgVolumeDesc="内容" // 自定义图片大小描述，
    imageType={['jpg', 'png', 'jpeg']} // 图片格式描述
    imageSizeDesc="" // 自定义图片尺寸描述，
  />
</Form.Item>
*/
const QiniuOSSUpload = ({
  imageSize,
  imageVolume,
  totalNum,
  value,
  onChange,
  hideDelIcon,
  hideViewIcon,
  showUploadList,
  token,
  limitShowBtn,
  allDoneCallback,
  percentCallback,
  btnTitle,
  accept,
  multiple,
  children,
  isImageDesc = false, // 是否开启右侧描述
  imageType,
  imageSizeDesc,
  imgVolumeDesc,
  action, // 自定义上传地址
}: QiniuOSSUploadProps): React.ReactElement => {
  const [fileListData, setFileListData] = useState<UploadValueData>([]);
  const [loading, setLoading] = useState(false);
  const [defaultImgIndex, setDefaultImgIndex] = useState(0);
  const [desLeft, setDesLeft] = useState(0); // 右侧浮云值
  const imgViewerRef = useRef<ImgViewerRef>(null);

  // 判断处理上传图片状态
  const diffFileListDone = useCallback(
    (filelist: UploadFile<any>[]) => {
      const flag = filelist.every((item) => {
        return item.status === 'done' || item.url;
      });
      if (flag) allDoneCallback?.(filelist);
    },
    [allDoneCallback],
  );

  // 添加上传后图片完整url字段
  const handleAddFileUrl = useCallback(
    (fileList: UploadFile<any>[]) => {
      const allLen = fileList?.length ?? 0;
      let doneLen = 0;
      let errorLen = 0;
      const data = fileList?.map((item) => {
        const newItem = item;
        if (item?.response?.key && !item.url && item.status === 'done') {
          newItem.url = getQiniuFileUrl(item?.response?.key);
        }
        // 进度处理
        if (item.status === 'done' || !item.status || item.url) {
          doneLen += 1;
        }
        if (item.status === 'error') errorLen += 1;
        return newItem;
      });
      const currentPercent = (doneLen / allLen) * 100;
      percentCallback?.(currentPercent, errorLen);
      return data;
    },
    [percentCallback],
  );

  // 上传事件
  const onFileChange = useCallback(
    async ({ file, fileList }: UploadChangeParam<UploadFile<any>>) => {
      // 单图模式
      if (!showUploadList) {
        const fileBuffer = await getBase64(file?.originFileObj);
        // eslint-disable-next-line no-param-reassign
        file.preview = fileBuffer;
      }

      if (file.status === 'uploading') setLoading(true);

      if (file.status === 'error') setLoading(false);
      if (file.status === 'done') {
        const newFileList = handleAddFileUrl(
          showUploadList ? [...fileList] : [file],
        );
        const cloneDeepFileList = cloneDeep(newFileList);
        if (allDoneCallback) diffFileListDone(newFileList);
        onChange?.(cloneDeepFileList); // antd Form使用
        setFileListData(cloneDeepFileList);
        setLoading(false);
      }
    },
    [
      showUploadList,
      handleAddFileUrl,
      allDoneCallback,
      diffFileListDone,
      onChange,
    ],
  );

  // 移除事件
  const onRemove = (file: FileListItem) => {
    const files = value?.filter((v) => v.url !== file.url);
    if (onChange) onChange(files);
    setFileListData(files || []);
  };

  const getExtraData = (file: FileListItem) => {
    return {
      'x:funcId': 1,
      token,
      key: generateQiniuImgUrlKey(file),
    };
  };

  // 上传前处理
  const beforeUpload = async (
    file: RcFile,
    fileList: RcFile[],
  ): Promise<any> => {
    const isImageSize = await imgSizeCheck(file, imageSize); // 文件尺寸宽高
    const isImageVolume = imageVolumeCheck(file, imageVolume); // 图片大小
    // 上传文件数量判断
    const isFileMaxSize = imageMaxSizeCheck({
      fileList: value || fileListData,
      upFileList: fileList,
      maxNum: totalNum,
    });

    return new Promise((resolve, reject) => {
      if (isImageSize && isImageVolume && isFileMaxSize) {
        resolve(true);
      }
      // eslint-disable-next-line prefer-promise-reject-errors
      reject(false);
    });
  };

  // 图片切换--返回索引及分页变量
  const getCurrentImgIdx = (file: FileListItem) => {
    let currentIndex = 0;
    (value || fileListData)?.some((item, index) => {
      // 获取当前点击图片的索引值
      if (item.uid === file.uid && item.url === file.url) {
        currentIndex = index;
        return true;
      }
      return false;
    });

    return currentIndex;
  };

  // 图片查看事件
  const handlePreview = async (file: FileListItem) => {
    const currentImgIdx = getCurrentImgIdx(file);
    if (!file.url && !file.preview) {
      // eslint-disable-next-line no-param-reassign
      file.preview = await getBase64(file.originFileObj);
    }
    setDefaultImgIndex(currentImgIdx);
    imgViewerRef.current?.show?.(); // 显示预览
  };

  // 样式处理
  const uploadClass = () => {
    let cssName = ``;
    if (hideDelIcon) cssName += `${styles.hideDelIcon} `;
    if (hideViewIcon) cssName += `${styles.hideViewIcon} `;
    return cssName;
  };

  // 上传按钮组件
  const handleUploadImgList = () => {
    const data = value || fileListData;
    // 单图模式
    if (!showUploadList && data.length === 1) {
      return (
        <img
          src={data[0]?.url || data[0]?.preview}
          alt=""
          className={styles.imgWrap}
        />
      );
    }
    // 限制数量，显示上传组件
    const flag = (data?.length || 0) < (totalNum || 9999);
    return flag || limitShowBtn ? (
      <div style={{ position: 'relative' }}>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>{btnTitle}</div>
      </div>
    ) : null;
  };

  // 图片尺寸描述
  const handleImgSizeDesc = () => {
    let descInfo = imageSizeDesc;
    if (imageSize?.length >= 2) {
      descInfo = `${imageSize[0]}*${imageSize[1]} px`;
    }
    return descInfo;
  };

  // 图片大小描述
  const handleImgVolumeDesc = () => {
    const descInfo =
      imgVolumeDesc || `不超于${imageVolume?.fileSize}${imageVolume?.type}`;
    return descInfo;
  };

  // 动态改动描述位置
  useEffect(() => {
    if (totalNum !== 1) {
      const handleDesLeft = (fList: UploadValueData) => {
        const clientW =
          document.getElementById(styles.containerWrap)?.clientWidth || 0;
        const baseImgWidth = 112; // 图片基础宽度
        const lintMaxNum = floor(clientW / baseImgWidth); // 单行最大个数
        const imgAllWidth =
          fList.length >= lintMaxNum ? lintMaxNum : fList.length;
        setDesLeft(imgAllWidth * baseImgWidth);
      };
      handleDesLeft(value || []);
    }
  }, [totalNum, value]);

  return (
    <div className={styles.containerWrap} id={styles.containerWrap}>
      <Upload
        action={action || '//upload.qiniup.com'} // 上传url
        listType="picture-card"
        accept={accept || 'image/*'} // 文件选择类型
        multiple={multiple} // 是否多选
        fileList={value || fileListData}
        data={getExtraData}
        onChange={onFileChange}
        onPreview={handlePreview} // 查看
        onRemove={onRemove}
        beforeUpload={beforeUpload}
        className={uploadClass()}
        showUploadList={showUploadList}
      >
        {children || handleUploadImgList()}
      </Upload>

      {isImageDesc && (
        <ul className={styles.imgDescUl} style={{ left: 120 + desLeft }}>
          {!isEmpty(imageSizeDesc || imageSize) && (
            <li>图片尺寸：{handleImgSizeDesc()}</li>
          )}
          {!isEmpty(imageType) && <li>图片格式：{imageType?.join('/')}</li>}
          {!isEmpty(imageVolume) && <li>图片大小：{handleImgVolumeDesc()}</li>}
        </ul>
      )}

      {/* 查看图片弹层 */}
      <ImgViewer
        ref={imgViewerRef} // ref对象，暴露显示隐藏预览方法
        fileList={value} // 显示的图片数据
        defaultImgIndex={defaultImgIndex} // 默认显示图的索引
      />
    </div>
  );
};

QiniuOSSUpload.defaultProps = {
  accept: 'image/*', // 上传文件类型限制 image audio video
  hideViewIcon: false, // 是否隐藏查看icon按钮
  hideDelIcon: false, // 是否隐藏删除icon按钮
  showUploadList: true, // 是否多图list模式，或单图模式
  multiple: false, // 是否支持多选图片
  // totalNum: 10, // 上传数量限制
  limitShowBtn: false, // 超出数量限制是否显示上传按钮
  btnTitle: '点击上传', // 上传按钮文字
  imageSize: [], // img 尺寸 [宽，高]
  // imageVolume: {
  //   type: 'M',
  //   fileSize: 10, // 限制图片大小
  // },
};

export default QiniuOSSUpload;
