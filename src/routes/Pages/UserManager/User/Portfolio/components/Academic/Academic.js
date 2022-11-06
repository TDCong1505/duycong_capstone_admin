import React, { useMemo, useState, useEffect } from 'react';
import ModalPopup from 'routes/Pages/components/Element/ModalPopup/ModalPopup';
import styles from './Academic.module.scss';
import { DatePicker, Form, Input, message, Select, Upload } from 'antd';
import { handleError } from '@jumbo/utils/commonHelper';
import moment from 'moment';
import { format, getUnixTime } from 'date-fns';
import debounce from 'lodash.debounce';
import { DeleteOutlined, EditOutlined, InboxOutlined, PlusOutlined } from '@ant-design/icons';
import { getTokenUser } from 'helpers/uitilities';
import Axios from 'axios';
import { CONFIGURATION } from 'Configuration';
import { configConstant } from '@jumbo/constants/configConstant';
import UserService from 'services/auth/UserService';
import { prefix } from 'helpers/buildUrl';
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
};

export default function Academic({ profile, handleCallBack }) {
  const [form] = Form.useForm();

  const [allSchool, setAllSchool] = useState([]);

  const [isAcademicModal, setIsAcademicModal] = useState(false);

  const [currentId, setCurrentId] = useState();

  const [isDeleteAcademicModal, setIsDeleteAcademicModal] = useState(false);

  const [imgCertificate, setImgCertificate] = useState('');

  const handleConfirmDeleteAcademicModal = async () => {
    try {
      await UserService.deleteUserEducationApi(currentId);
      handleCallBack();
      message.success('Xóa học vấn thành công!');
    } catch (error) {
      handleError(error);
    } finally {
      setIsDeleteAcademicModal(false);
    }
  };

  const setValueToForm = item => {
    form.setFieldsValue({ id: item.id });
    form.setFieldsValue({ schoolId: item.schoolId });
    form.setFieldsValue({ grade: item.grade || null });
    form.setFieldsValue({ startDate: moment(item.startDate * 1000) });
    form.setFieldsValue({ endDate: item.endDate ? moment(item.endDate * 1000) : null });
    form.setFieldsValue({ degree: item.degree });
    form.setFieldsValue({ major: item.major });
    form.setFieldsValue({ otherDesc: item.otherDesc });
    // form.setFieldsValue({ imgCertificate: item.certificateImg })

    setIsAcademicModal(true);
  };

  const handleConfirmAcademicModal = async () => {
    try {
      const { id, schoolId, grade, startDate, endDate, degree, major, otherDesc } = form.getFieldsValue();
      const formData = { userId: profile.id };

      if (id) formData.id = id;
      if (schoolId) formData.schoolId = schoolId;
      if (grade) formData.grade = Number(grade);
      if (startDate) formData.startDate = getUnixTime(new Date(form.getFieldValue('startDate')));
      if (endDate) formData.endDate = getUnixTime(new Date(form.getFieldValue('endDate')));
      if (degree) formData.degree = degree;
      if (major) formData.major = major;
      if (otherDesc) formData.otherDesc = otherDesc;
      if (imgCertificate) formData.certificateImg = imgCertificate;

      if (!formData.id) {
        delete formData.id;
      }
      if (!formData.endDate) {
        delete formData.endDate;
      }
      if (!formData.grade) {
        delete formData.grade;
      }
      if (!formData.degree) {
        delete formData.degree;
      }
      if (!formData.otherDesc) {
        delete formData.otherDesc;
      }
      formData.id
        ? await UserService.patchUserEducationApi(formData.id, formData)
        : await UserService.postUserEducationApi(formData);
      handleCallBack();
      if (!formData.id) {
        message.success('Thêm mới thành công!');
      } else {
        message.success('Cập nhật thành công!');
      }
    } catch (error) {
      handleError(error);
    }
    setIsAcademicModal(false);
  };

  const debouncedEventHandler = useMemo(() => debounce(handleConfirmAcademicModal, 300), []);

  const getAllSchool = async () => {
    try {
      const { data } = await UserService.getAllDataSchoolApi();
      setAllSchool(data);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    getAllSchool();
  }, []);

  const noData = (
    <div className={styles.academic_empty}>
      Giúp bạn tiến gần hơn với công việc mơ ước, giúp nhà tuyển dụng đánh giá khả năng của bạn tốt hơn.
    </div>
  );
  const renderItem = profile.educations.map(item => {
    const timeStart = format(new Date(item.startDate * 1000), 'dd/MM/yyyy');
    const timeEnd = item.endDate ? format(new Date(item.endDate * 1000), 'dd/MM/yyyy') : null;
    return (
      <div key={item.id} className={styles.academic_item}>
        <div className={styles.academic_content}>
          <div className={styles.academic_info}>
            <div className={styles.academic_avatar}>
              <img alt="" src={`${prefix}/images/icons/academic.svg`} />
            </div>
            <div className={styles.academic_text}>
              <div className={styles.title}>Trường: {item.name}</div>
              <div className={styles.score}>
                Ngành học: <span>{item.major}</span>
              </div>
              <div className={styles.time}>
                {timeStart} - {timeEnd || 'nay'}
              </div>
            </div>
          </div>

          <div className={styles.academic_degree}>
            {!!item.grade && (
              <div className={styles.academic_text_score}>
                Điểm học tập (GPA) : <span>{item.grade}</span>
              </div>
            )}
            {item.degree && (
              <div>
                Bằng cấp: <span>{item.degree}</span>
              </div>
            )}
          </div>
          <div className={styles.academic_certificate}>
            <img alt="" src={item.certificateImg} />
          </div>

          <div className={styles.academic_option}>
            <EditOutlined
              onClick={() => {
                setValueToForm(item);
              }}
              className={styles.icon}
            />
            <DeleteOutlined
              onClick={() => {
                setCurrentId(item.id);
                setIsDeleteAcademicModal(true);
              }}
              className={styles.icon}
            />
          </div>
        </div>
      </div>
    );
  });

  const propsUpload = {
    name: 'file',
    multiple: true,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${getTokenUser()}`,
    },

    onRemove: file => {
      // getAvatar('')
    },
    customRequest: async options => {
      const fmData = new FormData();
      fmData.append('file', options.file);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${getTokenUser()}`,
        },
      };
      try {
        const result = await Axios.post(options.action, fmData, config);
        options.onSuccess(null, options.file);

        setImgCertificate(result.data.linkUrl);
      } catch (error) {
        options.onError();
        message.error('Có lỗi xảy ra trong quá trình upload ảnh');
      }
    },
  };

  const handleDomainPostImg = () => {
    if (process.env.REACT_APP_WEB_ENV === CONFIGURATION.environment.development) return configConstant.domainStagingEnv;
    return process.env.REACT_APP_API_URL;
  };

  return (
    <div className={styles.academic}>
      <div className={styles.academic_header}>
        <div className={styles.academic_title}>
          <div className={styles.title}>Học vấn</div>
          {profile.educations.length > 0 && <img alt="" src={`${prefix}/images/icons/color/icon_check.svg`} />}

        </div>
        <div
          className={styles.academic_edit}
          onClick={() => {
            setIsAcademicModal(true);
            form.resetFields();
          }}>
          <PlusOutlined style={{ marginRight: '.25rem' }} /> Thêm mới
        </div>
      </div>

      <div className={styles.academic_main}>{profile.educations?.length === 0 ? noData : renderItem}</div>

      <ModalPopup
        title="Xoá học vấn"
        visible={isDeleteAcademicModal}
        handleCancelModal={() => setIsDeleteAcademicModal(false)}
        handleConfirmModal={handleConfirmDeleteAcademicModal}
        transition="move-up">
        <div className="text-center">Bạn chắc chắn muốn xoá học vấn đã chọn?</div>
      </ModalPopup>

      {isAcademicModal && (
        <ModalPopup
          title="Học vấn"
          visible={isAcademicModal}
          handleCancelModal={() => setIsAcademicModal(false)}
          handleConfirmModal={() => {
            form.validateFields().then(() => {
              debouncedEventHandler();
            });
          }}
          width={768}
          textConfirm="Lưu">
          <div className="portfolio">
            <Form onKeyPress={(e) => {
              if (e.key === "Enter") {
                form.submit();
              }
            }} {...formItemLayout} form={form} initialValues={{}} scrollToFirstError onFinish={debouncedEventHandler}>
              <Form.Item name="id" hidden />
              <span className="fieldLabel">
                Chọn trường <span className="field-required">*</span>
              </span>
              <Form.Item
                name="schoolId"
                rules={[
                  {
                    required: true,
                    message: 'Trường đại học không được để trống!',
                  },
                ]}>
                <Select
                  getPopupContainer={trigger => trigger.parentNode}
                  size="large"
                  allowClear
                  showSearch
                  placeholder="Chọn trường"
                  optionFilterProp="children">
                  {allSchool.map(item => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.shortName} - {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <span className="fieldLabel">
                Ngành học <span className="field-required">*</span>
              </span>
              <Form.Item
                name="major"
                rules={[
                  {
                    required: true,
                    message: 'Ngành học không được để trống!',
                  },
                ]}>
                <Input style={{ height: '40px', borderRadius: '7px' }} placeholder="Ngành học" />
              </Form.Item>
              <span className="fieldLabel">Điểm học tập (GPA)</span>
              <Form.Item name="grade">
                <Input style={{ height: '40px', borderRadius: '7px' }} placeholder="Điểm học tập (GPA)" />
              </Form.Item>
              <div className="d-flex justify-content-between">
                <div style={{ width: '47.5%' }}>
                  <span className="fieldLabel">
                    Thời gian bắt đầu <span className="field-required">*</span>
                  </span>
                  <Form.Item
                    name="startDate"
                    rules={[
                      {
                        required: true,
                        message: 'Thời gian bắt đầu không được để trống!',
                      },
                    ]}>
                    <DatePicker
                      size="large"
                      style={{ width: '100%', borderRadius: '7px' }}
                      placeholder="Thời gian bắt đầu"
                    />
                  </Form.Item>
                </div>
                <div style={{ width: '47.5%' }}>
                  <span className="fieldLabel">Thời gian kết thúc</span>
                  <Form.Item name="endDate">
                    <DatePicker
                      style={{ width: '100%', borderRadius: '7px' }}
                      size="large"
                      placeholder="Thời gian kết thúc"
                    />
                  </Form.Item>
                </div>
              </div>

              <span className="fieldLabel">Bằng cấp</span>
              <Form.Item name="degree">
                <Input style={{ height: '40px', borderRadius: '7px' }} placeholder="Bằng cấp" />
              </Form.Item>
              <span className="fieldLabel">Ghi chú</span>
              <Form.Item
                rules={[
                  {
                    max: 500,
                    message: 'Tối đa 500 kí tự!',
                  },
                ]}
                name="otherDesc">
                <Input style={{ height: '40px', borderRadius: '7px' }} placeholder="Ghi chú" />
              </Form.Item>

              <span className="fieldLabel">Ghi chú</span>
              <Form.Item name="imgCertificate">
                <Upload.Dragger {...propsUpload} action={`${handleDomainPostImg()}/upload/v1.0/upload`}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Thêm hình ảnh chụp bằng cấp của bạn</p>
                  <p className="ant-upload-hint">
                    (Đăng file hình cảnh .png, .jpb rõ nét. Dung lượng file không vượt quá 5MB)
                  </p>
                </Upload.Dragger>
                <div className="mt-4">{imgCertificate}</div>
              </Form.Item>
            </Form>
          </div>
        </ModalPopup>
      )}
    </div>
  );
}
