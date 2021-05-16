import { UploadFile } from 'antd/lib/upload/interface';

// 单个file文件类型
export interface FileListItem extends UploadFile<any> {
  // url: string;
  // uid?: string;
  // status?: string;
  // preview?: string;
  // name?: string;
}

// files文件类型
export type UploadValueData = UploadFile<any>[];

export type ImageSizeType = number[];

// 组件props参数
export interface QiniuOSSUploadProps {
  imageSize: ImageSizeType;
  imageVolume: ImageVolumeType;
  totalNum: number;
  value?: UploadValueData;
  onChange: (data: UploadValueData | undefined) => void;
  hideDelIcon: boolean;
  hideViewIcon: boolean;
  showUploadList: boolean;
  token: string;
  limitShowBtn: boolean;
  allDoneCallback?: (files: UploadFile<any>[]) => void;
  percentCallback?: (currentPercent: number, errorLen: number) => void;
  btnTitle?: string;
  accept: string;
  multiple: boolean;
  children?: any;
  isImageDesc: boolean; // 是否开启右侧描述
  imageType?: string[];
  imageSizeDesc?: string;
  imgVolumeDesc?: string;
  action?: string; // 自定义上传地址
}

// 图片大小限制、描述
export interface ImageVolumeType {
  type: 'M' | 'kb';
  fileSize: number;
}
