import * as axios from 'axios';

const CancelToken = axios.default.CancelToken;

const uploadFile = async (
  url: string,
  fileFormData: FormData,
  callback: any,
  rawFile: any,
  isUseToken: boolean | undefined = false,
  onStartUploadingCallback?: (rawFile: any) => void
): Promise<File | any> => {
  const accessToken = new URLSearchParams(window.location.search).get('access_token');
  url = !isUseToken ? url : `${url}?access_token=${accessToken}`;
  try {
    const headers = {'Content-Type': 'multipart/form-data'};
    const config = {
      headers,
      onUploadProgress: (progressEvent: any) => callback?.(rawFile, Math.round((progressEvent.loaded * 100) / progressEvent.total)),
      cancelToken: new CancelToken((canceler) => rawFile.canceled = canceler)
    };
    onStartUploadingCallback?.(rawFile);
    return await axios.default.post(url, fileFormData, config);
  } catch (err) {
    if (axios.default.isCancel(err)) {
      return {data: {canceled: true}};
    }
    return err;
  }
};

export {uploadFile};
