# Demo sử dụng React với React Query để truy vấn dữ liệu

Link tài liệu: [docs](https://react-query.tanstack.com/overview)

## Cài đặt

`yarn add react-query`

hoặc

`npm install react-query`

## API

### useQuery
`
  const { 
    data, 

    error, 

    isIdle, 
    isError, 
    isFetched, 
    isFetching, 
    isLoading, 
    isStale, 
    isSuccess, 
    status, 
    ...rest, 
  } = useQuery(queryKey, queryFn?, { 
    cacheTime, 
    enabled, 
    refetchInterval, 
    refetchIntervalInBackground, 
    refetchOnReconnect, 
    refetchOnWindowFocus, 
    retry, 
    retryDelay, 
    staleTime, 
    ...rest, 
  }) 
`

- `queryKey: string | unknown[]`
  - Định danh cho query, phân biệt giữa các query khác
- `queryFn: (context: QueryFunctionContext) => Promise<TData>`
  - Hàm truy vấn request đến API, cần trả về `Promise`
  - Bắt buộc, trừ khi đã khai báo hàm truy vấn mặc định
- `options`
    - `cacheTime: number | Infinity`
      - Thời gian dữ liệu cache nằm trong bộ nhớ (đơn vị: millisecond)
      - Đặt giá trị là Infinity nếu vô hiệu hóa garbage collection
    - `enabled: boolean`
      - Đặt `false` để ngăn query tự động chạy
    - `refetchInterval: false | number`
      - Đặt giá trị số (đơn vị: millisecond) để làm mới truy vấn liên tục trong khoảng thời gian
    - `refetchIntervalInBackground: boolean`
      - Cài đặt cho phép truy vấn lại khi tab/cửa sổ đang chạy nền
    - `refetchOnReconnect: boolean | "always"`
      - `true`: Truy vấn lại khi có lại kết nối internet nếu dữ liệu cũ
      - `false`: Không truy vấn lại khi có lại kết nối internet
      - `"always"`: Luôn truy vấn lại khi có lại kết nối internet
    - `refetchOnWindowFocus: boolean | "always"`
      - `true`: Truy vấn lại khi focus lại vào cửa sổ nếu dữ liệu cũ
      - `false`: Không truy vấn lại khi focus lại vào cửa sổ
      - `"always"`: Luôn truy vấn lại khi focus lại vào cửa sổ
    - `retry: boolean | number | (failureCount: number, error: TError) => boolean`
      - `false`: Không bao giờ thử lại với truy vấn lỗi
      - `true`: Thử lại truy vấn lỗi cho đến khi thành công
      - `number`: Thử lại truy vấn lỗi một số lần
    - `retryDelay: number | (retryAttempt: number, error: TError) => number`
      - `number`: Đợi một khoảng thời gian (đơn vị: millisecond) trước khi thử lại
      - Truyền vào hàm để triển khai thời gian delay tuyến tính/số mũ.
- `result`
  - `status: "idle" | "loading" | "error" | "success"`
  - `isIdle: boolean`: `status === "idle"`
  - `isLoading: boolean`: `status === "loading"`
  - `isError: boolean`: `status === "error"`
  - `isSuccess: boolean`: `status === "success"`
  - `data`: dữ liệu trả về từ truy vấn
  - `error`:
    - Mặc định là `null`
    - Lỗi được throw từ truy vấn
  - `isFetched: boolean`: truy vấn đã hoàn thành
  - `isFetching: boolean`: truy vấn đang xử lý
  - `isStale: boolean`: dữ liệu cache đã cũ chưa (quá thời gian `staleTime` hoặc đã bị invalidate)


## Demo

### Tạo custom hook với useQuery

[src/hooks/useData.js](https://github.com/lqaxx7799/react-query-demo/tree/master/src/hooks/useData.js)

- Hook `useData` có thể được truy cập ở các Component khác nhau.
- Nếu gọi trong khoảng thời gian `staleTime`, không tạo ra request mới mà lấy từ cache.

### Sử dụng custom hook
[src/MyComponent.js](https://github.com/lqaxx7799/react-query-demo/tree/master/src/MyComponent.js) 

[src/AnotherComponent.js](https://github.com/lqaxx7799/react-query-demo/tree/master/src/AnotherComponent.js) 

### Phân trang (Pagination)
[src/PaginatedComponent.js](https://github.com/lqaxx7799/react-query-demo/tree/master/src/PaginatedComponent.js) 

### Cuộn vô hạn (Infinite Scroll) với useInfiniteQuery
[src/InfiniteComponent.js](https://github.com/lqaxx7799/react-query-demo/tree/master/src/InfiniteComponent.js) 
