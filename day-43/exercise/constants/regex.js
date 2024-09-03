export const regexPatterns = {
  passwordPattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
  telephonePattern: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/g,
  emailPattern: /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g,
  youtubePattern: /(https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/[^\s]+)/g,
  normalLinkPattern: /((https?:\/\/)|(www\.))[^\s]+/g,
};
