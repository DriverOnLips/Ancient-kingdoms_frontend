import { ResponseDefault } from "../../api/ResponseInterface";

export function mockedCheckLoginResponce() {
  const CheckLoginResponce: ResponseDefault = {
    Code: 503,
    Status: 'service unavailable',
    Message: 'Нет ответа от сервера',
    Body: null,
  }

  return CheckLoginResponce;
}