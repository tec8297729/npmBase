import React, { useState, useImperativeHandle, forwardRef } from 'react';
import Viewer from 'react-viewer';
import { UploadValueData } from '../typeData';

interface IProps {
  defaultImgIndex?: number;
  baseImg?: string;
  fileList?: UploadValueData;
}

interface Viewerimage {
  thumbUrl: string;
  src: string;
  alt: string;
}

export interface ImgViewerRef {
  show: () => void;
  hide: () => void;
}

/* 多功能图片预览组件
<ImgViewer
  ref={imgViewerRef} // ref对象，暴露显示隐藏预览方法
  fileList={props.value} // 显示的图片数据
  currentIndex={0} // 默认显示图的索引
/>

imgViewerRef.current?.show(); // 显示预览
imgViewerRef.current?.hide(); // 隐藏预览
*/
const ImgViewer = forwardRef<ImgViewerRef, IProps>(
  (
    { defaultImgIndex, baseImg = 'img.kaikeba.com', fileList = [] },
    ref,
  ): React.ReactElement => {
    const [previewVisible, setPreviewVisible] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
      show: (): void => setPreviewVisible(true),
      hide: (): void => setPreviewVisible(false),
    }));

    const handleImgUrl = (url: string): string => {
      let newUrlStr = url;
      // qiniu处理
      if (/\?imageView2\//.test(newUrlStr)) {
        const reg = newUrlStr.match(/(?<u>.*)\?.*/);
        newUrlStr = reg?.groups?.u || newUrlStr;
      }
      return newUrlStr || '';
    };

    // 处理转换弹层显示的图片数组
    const handleViewerImgs = (): Viewerimage[] => {
      const newFileList = fileList?.map((item) => {
        const imgUrl: string = item.url || '';
        const tempData: Viewerimage = {
          thumbUrl: imgUrl,
          src: imgUrl,
          alt: item.uid || '',
        };

        if (new RegExp(`${baseImg}`).test(imgUrl)) {
          tempData.thumbUrl = `${handleImgUrl(imgUrl)}&imageView2/3/w/132/h/88`;
          tempData.src = `${imgUrl}`;
        }

        return tempData;
      });
      return newFileList;
    };

    // 隐藏显示图片（弹层）
    const closeViewer = (): void => {
      setPreviewVisible(false);
    };

    return (
      <Viewer
        visible={previewVisible}
        onClose={closeViewer} // 右上角关闭事件
        onMaskClick={closeViewer} // 蒙层点击事件
        zoomSpeed={0.5} // 每次放大比例（数值越大一次性放大越多）
        // 加载失败显示图片
        // defaultImg={{
        //   src: ''
        // }}
        images={handleViewerImgs()} // 显示图片--数组
        activeIndex={defaultImgIndex ?? 0} // 默认显示图片的索引值
        // scalable={false} // 隐藏上下、左右翻转功能
        // attribute={false} // 隐藏图片属性信息
        zoomable={false} // 隐藏缩放按钮
        showTotal={false}
      />
    );
  },
);

export default ImgViewer;
