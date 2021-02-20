import { RcFile } from 'antd/lib/upload';
import { globalData } from '../../../consts';
import { formatDate } from '../../../utils';
import Tips from '../../../utils/tips_utils';
import {
  UploadValueData,
  FileListItem,
  ImageVolumeType,
  ImageSizeType,
} from './typeData';

/**
 * 生成随机字符串
 * @param {*} length
 * @param {*} chars
 */
export const randomString = (
  length = 4,
  chars = 'abcdefghijklmnopqrstuvwxyz',
) => {
  let result = '';
  // eslint-disable-next-line
  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};

/**
 * 随机生成图片urlKey
 */
export const generateName = () => {
  const key = `${formatDate(new Date(), 'YYYYMMDDHHmmss')}_${randomString(6)}`;
  return key;
};

/**
 * 生成七牛图片 唯一名称路径
 */
export const generateQiniuImgUrlKey = (file: FileListItem) => {
  const ext = file.name.split('.').splice(-1);
  const key = `${globalData.qiniuOpts.prefix}${generateName()}.${ext}`; // 自定义文件名
  return key;
};

// 获取七牛完整url
export const getQiniuFileUrl = (fileName: string) => {
  const imageUrl = `${globalData.qiniuOpts.imgHost}${fileName}`;
  return imageUrl;
};

// 把file文件转成blob
export const getBase64 = (
  img: File | Blob | undefined,
  callback?: Function,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    if (img) reader.readAsDataURL(img);
    reader.onload = async () => {
      await callback?.(reader.result);
      resolve(reader.result?.toString() || '');
    };
    reader.onerror = (error) => reject(error);
  });
};

/**
 * image 尺寸检测宽高
 */
export const imgSizeCheck = async (files: RcFile, imageSize: ImageSizeType) => {
  if (!imageSize) return false;

  const fileBuffer = await getBase64(files);
  return new Promise((resolve) => {
    const image = new Image();
    image.src = fileBuffer;
    image.onload = () => {
      switch (imageSize?.length || 0) {
        case 1:
          if (image.width >= imageSize[0]) {
            Tips.error(`图片尺寸错误，请上传宽${imageSize[0]}px的图片！`);
            resolve(false);
          }
          resolve(true);
          break;
        case 2:
          if (!(image.width <= imageSize[0] && image.height <= imageSize[1])) {
            Tips.error(`图片尺寸错误，请上传相应尺寸图片！`);
            // Tips.error(`图片尺寸错误，请上传宽${imageSize[0]}px，高${imageSize[1]}px的图片！`);
            resolve(false);
          }
          resolve(true);
          break;
        default:
          resolve(true);
          break;
      }
    };
  });
};

/**
 * image 文件大小检测
 */
export const imageVolumeCheck = (
  file: FileListItem,
  checkValue: ImageVolumeType,
) => {
  if (!checkValue) return true;
  const fileSize = file.size; // b
  if (checkValue.type === 'kb') {
    if (fileSize / 1024 > checkValue.fileSize) {
      Tips.error(
        `图片超出限定大小，请上传不大于${checkValue.fileSize}kb的图片！`,
      );
      return false;
    }
  }
  if (checkValue.type === 'M') {
    if (fileSize / 1024 / 1024 > checkValue.fileSize) {
      Tips.error(
        `图片超出限定大小，请上传不大于${checkValue.fileSize}M的图片！`,
      );
      return false;
    }
  }
  return true;
};

interface ImageMaxSizeCheckData {
  fileList: UploadValueData;
  maxNum?: number;
  upFileList: RcFile[];
}
/**
 * 上传文件数量限制
 * @fileList 已有file文件列表
 * @upFileList 当前正在上传列表
 * @maxNum 最大上传限制
 */
export const imageMaxSizeCheck = ({
  fileList = [],
  maxNum,
  upFileList = [],
}: ImageMaxSizeCheckData): boolean => {
  if (!maxNum) return true;
  const hasNum = fileList?.length || 0;
  const curNum = upFileList?.length || 0;
  // 最大限制数量 未超过上传+现有数量
  if (maxNum >= hasNum + curNum) return true;
  Tips.error(`上传超出限定数量，图片总数量最多${maxNum}张！`);
  return false;
};
