import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

// 기본 설정 타입
interface ApiConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

// 사용자 정의 에러 핸들러 타입
type ErrorHandler = (error: AxiosError) => Promise<never>;

// API 클래스
class Api {
  private instance: AxiosInstance;
  private errorHandler: ErrorHandler;

  constructor(config: ApiConfig) {
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 10000,
      headers: {
        "Content-Type": "application/json",
        ...config.headers,
      },
    });

    // 기본 에러 핸들러
    this.errorHandler = (error: AxiosError) => Promise.reject(error);

    this.setupInterceptors();
  }

  // 인터셉터 설정
  private setupInterceptors() {
    this.instance.interceptors.request.use(
      this.handleRequest,
      this.handleRequestError,
    );
    this.instance.interceptors.response.use(
      this.handleResponse,
      this.handleResponseError,
    );
  }

  // 요청 핸들러 (사용자 정의 가능)
  private handleRequest(
    config: InternalAxiosRequestConfig,
  ): InternalAxiosRequestConfig {
    // TODO: 요청 전처리 (예: 토큰 추가)
    return config;
  }

  // 요청 에러 핸들러 (사용자 정의 가능)
  private handleRequestError(error: AxiosError): Promise<never> {
    return this.errorHandler(error);
  }

  // 응답 핸들러 (사용자 정의 가능)
  private handleResponse(response: AxiosResponse): AxiosResponse {
    return response;
  }

  // 응답 에러 핸들러 (사용자 정의 가능)
  private handleResponseError(error: AxiosError): Promise<never> {
    return this.errorHandler(error);
  }

  // 사용자 정의 에러 핸들러 설정
  public setErrorHandler(handler: ErrorHandler) {
    this.errorHandler = handler;
  }

  // API 메서드
  public get<T = any>(url: string, config?: InternalAxiosRequestConfig) {
    return this.instance.get<T>(url, config);
  }

  public post<T = any>(
    url: string,
    data?: any,
    config?: InternalAxiosRequestConfig,
  ) {
    return this.instance.post<T>(url, data, config);
  }

  public put<T = any>(
    url: string,
    data?: any,
    config?: InternalAxiosRequestConfig,
  ) {
    return this.instance.put<T>(url, data, config);
  }

  public delete<T = any>(url: string, config?: InternalAxiosRequestConfig) {
    return this.instance.delete<T>(url, config);
  }

  public patch<T = any>(
    url: string,
    data?: any,
    config?: InternalAxiosRequestConfig,
  ) {
    return this.instance.patch<T>(url, data, config);
  }
}

// API 인스턴스 생성 함수
export const createApi = (config: ApiConfig) => new Api(config);

// 사용 예시
export const api = createApi({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://api.example.com",
});
