import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MarkdownEditor from 'markdown-latex';
import './index.css';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      contentMd: '',
    };
    const { defaultText, defaultMd } = this.props;

    if (defaultText) {
      this.state.content = defaultText;
    }
    if (defaultMd) {
      this.state.contentMd = defaultMd;
    }
  }
  timer = null;

  componentDidMount() {
    this.initEdit();
    // this.editor.on('text-change', this.onChange)
  }

  componentWillUnmount() {}

  autoSave = () => {
    clearInterval(this.timer);
    const { autoSaveInterval } = this.props;
    this.timer = setInterval(this.saveContent, autoSaveInterval || 3000);
  };

  saveContent = () => {
    const { content } = this.state;
    localStorage.setItem('quill-content', content);
  };

  onChange = (content) => {
    const { onChange } = this.props;
    this.setState({ content });
    onChange && onChange(content);
    // setTimeout(() => console.log(this.getContent()));
  };
  onChangeMd = (contentMd) => {
    const { onChange } = this.props;
    this.setState({ contentMd });
    onChange && onChange(contentMd);
    // setTimeout(() => console.log(this.getContent()));
  };

  addXiumiContent = (data) => {
    this.onChange(null, null, data);
  };

  initEdit = () => {};

  insertContent(content) {
    this.setState({
      content,
    });
  }

  getContent() {
    return this.state.content;
  }

  onBlur() {
    const { editorBlur } = this.props;
    editorBlur && editorBlur();
  }

  get videoProps() {
    const { videoProps } = this.props;
    return {
      videoProps,
      editor: this.editor,
    };
  }

  get imgProps() {
    const { imgProps } = this.props;
    return {
      ...imgProps,
      editor: this.editor,
    };
  }

  render() {
    const { toolBar } = this.props;
    const toolbar = toolBar
      ? [
          'undo redo styleselect bold italic link image' +
            ' media codesample alignleft aligncenter alignright newdocument' +
            ' inserttable pagebreak nonbreaking anchor toc insertdatetime' +
            ' bold italic underline strikethrough superscript subscript codeformat' +
            ' formats blockformats fontformats fontsizes align forecolor backcolor' +
            ' removeformat spellchecker spellcheckerlanguage code wordcount' +
            ' inserttable cell row column insert table',
        ]
      : {
          h1: true, // h1
          h2: true, // h2
          h3: true, // h3
          h4: true, // h4
          img: true, // 图片
          link: true, // 链接
          code: true, // 代码块
          preview: true, // 预览
          expand: true, // 全屏
          /* v0.0.9 */
          undo: true, // 撤销
          redo: true, // 重做
          save: true, // 保存
          /* v0.2.3 */
          subfield: true, // 单双栏模式
        };
    return (
      <div className="quillEditor">
        <MarkdownEditor
          value={this.state.contentMd}
          onChange={this.onChangeMd.bind(this)}
          height={500}
          toolbar={toolbar}
          ref={(ref) => {
            this.editor = ref;
          }}
          addImg={(data) => {
            const { upload } = this.props;
            upload({
              file: data,
              onSuccess: (data) => {
                let content =
                  this.state.contentMd + `![filename](${data.data.url})`;
                // this.setState({
                //   contentMd: content,
                // });
                this.onChangeMd(content);
              },
            });
          }}
        />
      </div>
    );
  }
}

Editor.propTypes = {
  initialContent: PropTypes.string,
  autoSaveInterval: PropTypes.number,
  onChange: PropTypes.func,
  uploadUrl: PropTypes.string,
  editorId: PropTypes.string,
};

Editor.defaultProps = {
  editorId: 'customEditor',
  showTools: true,
};

export default Editor;
