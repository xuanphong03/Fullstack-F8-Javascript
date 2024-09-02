export const regex = {
  password: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
  telephone: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/g,
  email: /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g,
  videoYoutube:
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  link: /^(https?:\/\/)?([a-zA-Z0-9.-]+)(\.[a-zA-Z]{2,})(:[0-9]{1,5})?(\/[^\s]*)?$/g,
};
