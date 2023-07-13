const createSubscribeButton = () => {
  return `
    <button class="subscribe-btn">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12.998H13V18.998H11V12.998H5V10.998H11V4.99799H13V10.998H19V12.998Z" fill="#879298"/>
        </svg>
        <div class="available-medium12">구독하기</div>
    </button>
 `;
};

export { createSubscribeButton };
