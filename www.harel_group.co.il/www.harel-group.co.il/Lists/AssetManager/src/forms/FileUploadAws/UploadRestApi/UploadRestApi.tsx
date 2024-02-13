import * as axios from "axios";
const CancelToken = axios.default.CancelToken;

const uploadFile = async (
  url: string,
  fileFormData: File,
  callback: any,
  rawFile: any,
  onStartUploadingCallback?: (rawFile: any) => void): Promise<any> => {
    try {
        const headers = {'Content-Type': fileFormData.type};
        const config = {
            headers,
            onUploadProgress: (progressEvent: any) => callback?.(rawFile, Math.round((progressEvent.loaded * 100) / progressEvent.total)),
            cancelToken: new CancelToken((canceler) => rawFile.canceled = canceler)
        };
        onStartUploadingCallback?.(rawFile);
        return await axios.default.put(url, fileFormData, config);
    } catch (err) {
        if (axios.default.isCancel(err)) {
            return {data: {canceled: true}};
        }
        return err;
    }
};

const getAwsUrl = async (
    presignUrl: string,
    fileName: string,
    isUseToken: boolean | undefined = false,
): Promise<any> => {
    const accessToken = new URLSearchParams(window.location.search).get('access_token');
    presignUrl = !isUseToken ? presignUrl : `${presignUrl}?access_token=${accessToken}`;

    try {
        const body = {fileName};
        return await axios.default.post(presignUrl, body);

    } catch (err) {
        if (axios.default.isCancel(err)) {
            return {data: {canceled: true}};
        }
        return err;
    }
};


export {getAwsUrl, uploadFile};
