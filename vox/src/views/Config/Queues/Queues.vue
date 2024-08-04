<template>
  <div class="get-users-page-container" @click="hideListOptions($event); indexQueue='false'" v-click-outside="hide">
    <div class="toolbar">

      <div>
        <div class="btn-img">
          <span content="Add new queue" v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }"
                class="add-btns" @click="addNewQueue">
            <img width="15" height="12" src="@/assets/img/icons/plus.svg" alt="plus" class="add-btn-plus"/>
            <svg width="31" height="20" viewBox="0 0 31 26" fill="none" xmlns="http://www.w3.org/2000/svg"
                 class="add-btn">
              <path
                d="M2.80834 23.489C4.35894 23.489 26.8431 23.489 26.8431 23.489V26.0006L31 21.5328L26.8431 17.0651V19.5756C26.8431 19.5756 4.86455 19.5756 2.80882 19.5756C0.753096 19.5756 0.233999 16.6406 0.233999 16.6406C-0.676449 20.1043 1.25774 23.489 2.80834 23.489Z"
                fill="#276899"/>
              <mask id="path-2-inside-1" fill="white">
              <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M27.192 13.294C27.192 13.7257 26.8523 14.076 26.4322 14.076C26.012 14.076 25.6723 13.7257 25.6723 13.294C25.6723 11.1382 23.9681 9.38423 21.8733 9.38423C19.7785 9.38423 18.0743 11.1382 18.0743 13.294C18.0743 13.7257 17.7347 14.076 17.3145 14.076C16.8943 14.076 16.5547 13.7257 16.5547 13.294C16.5547 10.2757 18.9412 7.82031 21.8733 7.82031C24.8054 7.82031 27.192 10.2757 27.192 13.294ZM21.8735 1.76172C22.7116 1.76172 23.3931 2.55082 23.3931 3.52114C23.3931 4.49146 22.7116 5.28056 21.8735 5.28056C21.0354 5.28056 20.3539 4.49146 20.3539 3.52114C20.3539 2.55082 21.0354 1.76172 21.8735 1.76172ZM21.8734 7.03769C23.5496 7.03769 24.9127 5.45949 24.9127 3.51884C24.9127 1.5782 23.5496 0 21.8734 0C20.1973 0 18.8342 1.5782 18.8342 3.51884C18.8342 5.45949 20.1973 7.03769 21.8734 7.03769Z"/>
              </mask>
              <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M27.192 13.294C27.192 13.7257 26.8523 14.076 26.4322 14.076C26.012 14.076 25.6723 13.7257 25.6723 13.294C25.6723 11.1382 23.9681 9.38423 21.8733 9.38423C19.7785 9.38423 18.0743 11.1382 18.0743 13.294C18.0743 13.7257 17.7347 14.076 17.3145 14.076C16.8943 14.076 16.5547 13.7257 16.5547 13.294C16.5547 10.2757 18.9412 7.82031 21.8733 7.82031C24.8054 7.82031 27.192 10.2757 27.192 13.294ZM21.8735 1.76172C22.7116 1.76172 23.3931 2.55082 23.3931 3.52114C23.3931 4.49146 22.7116 5.28056 21.8735 5.28056C21.0354 5.28056 20.3539 4.49146 20.3539 3.52114C20.3539 2.55082 21.0354 1.76172 21.8735 1.76172ZM21.8734 7.03769C23.5496 7.03769 24.9127 5.45949 24.9127 3.51884C24.9127 1.5782 23.5496 0 21.8734 0C20.1973 0 18.8342 1.5782 18.8342 3.51884C18.8342 5.45949 20.1973 7.03769 21.8734 7.03769Z"
                    fill="#276899"/>
              <path
                d="M25.192 13.294C25.192 12.677 25.6927 12.076 26.4322 12.076V16.076C28.012 16.076 29.192 14.7743 29.192 13.294H25.192ZM26.4322 12.076C27.1716 12.076 27.6723 12.677 27.6723 13.294H23.6723C23.6723 14.7743 24.8523 16.076 26.4322 16.076V12.076ZM27.6723 13.294C27.6723 10.0882 25.1265 7.38423 21.8733 7.38423V11.3842C22.8097 11.3842 23.6723 12.1882 23.6723 13.294H27.6723ZM21.8733 7.38423C18.6202 7.38423 16.0743 10.0882 16.0743 13.294H20.0743C20.0743 12.1882 20.9369 11.3842 21.8733 11.3842V7.38423ZM16.0743 13.294C16.0743 12.677 16.575 12.076 17.3145 12.076V16.076C18.8943 16.076 20.0743 14.7743 20.0743 13.294H16.0743ZM17.3145 12.076C18.054 12.076 18.5547 12.677 18.5547 13.294H14.5547C14.5547 14.7743 15.7347 16.076 17.3145 16.076V12.076ZM18.5547 13.294C18.5547 11.3258 20.0994 9.82031 21.8733 9.82031V5.82031C17.7831 5.82031 14.5547 9.22548 14.5547 13.294H18.5547ZM21.8733 9.82031C23.6472 9.82031 25.192 11.3258 25.192 13.294H29.192C29.192 9.22548 25.9636 5.82031 21.8733 5.82031V9.82031ZM21.8735 3.76172C21.6351 3.76172 21.4859 3.64498 21.434 3.58485C21.3853 3.52848 21.3931 3.50036 21.3931 3.52114H25.3931C25.3931 1.73137 24.0812 -0.238281 21.8735 -0.238281V3.76172ZM21.3931 3.52114C21.3931 3.54192 21.3853 3.5138 21.434 3.45743C21.4859 3.3973 21.6351 3.28056 21.8735 3.28056V7.28056C24.0812 7.28056 25.3931 5.31091 25.3931 3.52114H21.3931ZM21.8735 3.28056C22.1119 3.28056 22.2611 3.3973 22.313 3.45743C22.3617 3.5138 22.3539 3.54192 22.3539 3.52114H18.3539C18.3539 5.31091 19.6658 7.28056 21.8735 7.28056V3.28056ZM22.3539 3.52114C22.3539 3.50036 22.3617 3.52848 22.313 3.58485C22.2611 3.64498 22.1119 3.76172 21.8735 3.76172V-0.238281C19.6658 -0.238281 18.3539 1.73137 18.3539 3.52114H22.3539ZM21.8734 9.03769C24.9192 9.03769 26.9127 6.27893 26.9127 3.51884H22.9127C22.9127 4.02479 22.7345 4.43652 22.508 4.69871C22.2848 4.95715 22.0541 5.03769 21.8734 5.03769V9.03769ZM26.9127 3.51884C26.9127 0.758752 24.9192 -2 21.8734 -2V2C22.0541 2 22.2848 2.08054 22.508 2.33897C22.7345 2.60117 22.9127 3.0129 22.9127 3.51884H26.9127ZM21.8734 -2C18.8277 -2 16.8342 0.758752 16.8342 3.51884H20.8342C20.8342 3.0129 21.0124 2.60117 21.2389 2.33897C21.4621 2.08054 21.6928 2 21.8734 2V-2ZM16.8342 3.51884C16.8342 6.27893 18.8277 9.03769 21.8734 9.03769V5.03769C21.6928 5.03769 21.4621 4.95715 21.2389 4.69871C21.0124 4.43652 20.8342 4.02479 20.8342 3.51884H16.8342Z"
                fill="#276899" mask="url(#path-2-inside-1)"/>
              <mask id="path-4-inside-2" fill="white">
              <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M19.5943 16.8136C19.5943 17.2452 19.2547 17.5955 18.8345 17.5955C18.4143 17.5955 18.0747 17.2452 18.0747 16.8136C18.0747 14.6577 16.3704 12.9038 14.2757 12.9038C12.1809 12.9038 10.4766 14.6577 10.4766 16.8136C10.4766 17.2452 10.137 17.5955 9.71684 17.5955C9.29666 17.5955 8.95703 17.2452 8.95703 16.8136C8.95703 13.7952 11.3436 11.3398 14.2757 11.3398C17.2078 11.3398 19.5943 13.7952 19.5943 16.8136ZM14.2755 5.28125C15.1136 5.28125 15.7951 6.07035 15.7951 7.04067C15.7951 8.01099 15.1136 8.80009 14.2755 8.80009C13.4374 8.80009 12.7559 8.01099 12.7559 7.04067C12.7559 6.07035 13.4374 5.28125 14.2755 5.28125ZM14.2754 10.5572C15.9516 10.5572 17.3147 8.97902 17.3147 7.03837C17.3147 5.09773 15.9516 3.51953 14.2754 3.51953C12.5993 3.51953 11.2362 5.09773 11.2362 7.03837C11.2362 8.97902 12.5993 10.5572 14.2754 10.5572Z"/>
              </mask>
              <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M19.5943 16.8136C19.5943 17.2452 19.2547 17.5955 18.8345 17.5955C18.4143 17.5955 18.0747 17.2452 18.0747 16.8136C18.0747 14.6577 16.3704 12.9038 14.2757 12.9038C12.1809 12.9038 10.4766 14.6577 10.4766 16.8136C10.4766 17.2452 10.137 17.5955 9.71684 17.5955C9.29666 17.5955 8.95703 17.2452 8.95703 16.8136C8.95703 13.7952 11.3436 11.3398 14.2757 11.3398C17.2078 11.3398 19.5943 13.7952 19.5943 16.8136ZM14.2755 5.28125C15.1136 5.28125 15.7951 6.07035 15.7951 7.04067C15.7951 8.01099 15.1136 8.80009 14.2755 8.80009C13.4374 8.80009 12.7559 8.01099 12.7559 7.04067C12.7559 6.07035 13.4374 5.28125 14.2755 5.28125ZM14.2754 10.5572C15.9516 10.5572 17.3147 8.97902 17.3147 7.03837C17.3147 5.09773 15.9516 3.51953 14.2754 3.51953C12.5993 3.51953 11.2362 5.09773 11.2362 7.03837C11.2362 8.97902 12.5993 10.5572 14.2754 10.5572Z"
                    fill="#276899"/>
              <path
                d="M17.5943 16.8136C17.5943 16.1965 18.095 15.5955 18.8345 15.5955V19.5955C20.4143 19.5955 21.5943 18.2939 21.5943 16.8136H17.5943ZM18.8345 15.5955C19.574 15.5955 20.0747 16.1965 20.0747 16.8136H16.0747C16.0747 18.2939 17.2547 19.5955 18.8345 19.5955V15.5955ZM20.0747 16.8136C20.0747 13.6077 17.5288 10.9038 14.2757 10.9038V14.9038C15.2121 14.9038 16.0747 15.7077 16.0747 16.8136H20.0747ZM14.2757 10.9038C11.0225 10.9038 8.47664 13.6077 8.47664 16.8136H12.4766C12.4766 15.7077 13.3392 14.9038 14.2757 14.9038V10.9038ZM8.47664 16.8136C8.47664 16.1965 8.97736 15.5955 9.71684 15.5955V19.5955C11.2967 19.5955 12.4766 18.2939 12.4766 16.8136H8.47664ZM9.71684 15.5955C10.4563 15.5955 10.957 16.1965 10.957 16.8136H6.95703C6.95703 18.2939 8.13702 19.5955 9.71684 19.5955V15.5955ZM10.957 16.8136C10.957 14.8454 12.5018 13.3398 14.2757 13.3398V9.33984C10.1854 9.33984 6.95703 12.745 6.95703 16.8136H10.957ZM14.2757 13.3398C16.0496 13.3398 17.5943 14.8454 17.5943 16.8136H21.5943C21.5943 12.745 18.3659 9.33984 14.2757 9.33984V13.3398ZM14.2755 7.28125C14.0371 7.28125 13.8879 7.16451 13.836 7.10438C13.7873 7.04801 13.7951 7.01989 13.7951 7.04067H17.7951C17.7951 5.2509 16.4832 3.28125 14.2755 3.28125V7.28125ZM13.7951 7.04067C13.7951 7.06145 13.7873 7.03333 13.836 6.97696C13.8879 6.91683 14.0371 6.80009 14.2755 6.80009V10.8001C16.4832 10.8001 17.7951 8.83044 17.7951 7.04067H13.7951ZM14.2755 6.80009C14.5139 6.80009 14.6631 6.91683 14.715 6.97696C14.7637 7.03333 14.7559 7.06145 14.7559 7.04067H10.7559C10.7559 8.83044 12.0678 10.8001 14.2755 10.8001V6.80009ZM14.7559 7.04067C14.7559 7.01989 14.7637 7.04801 14.715 7.10438C14.6631 7.16451 14.5139 7.28125 14.2755 7.28125V3.28125C12.0678 3.28125 10.7559 5.2509 10.7559 7.04067H14.7559ZM14.2754 12.5572C17.3212 12.5572 19.3147 9.79847 19.3147 7.03837H15.3147C15.3147 7.54432 15.1365 7.95605 14.91 8.21824C14.6868 8.47668 14.456 8.55722 14.2754 8.55722V12.5572ZM19.3147 7.03837C19.3147 4.27828 17.3212 1.51953 14.2754 1.51953V5.51953C14.456 5.51953 14.6868 5.60007 14.91 5.85851C15.1365 6.1207 15.3147 6.53243 15.3147 7.03837H19.3147ZM14.2754 1.51953C11.2297 1.51953 9.23622 4.27828 9.23622 7.03837H13.2362C13.2362 6.53243 13.4144 6.1207 13.6409 5.85851C13.8641 5.60007 14.0948 5.51953 14.2754 5.51953V1.51953ZM9.23622 7.03837C9.23622 9.79847 11.2297 12.5572 14.2754 12.5572V8.55722C14.0948 8.55722 13.8641 8.47668 13.6409 8.21824C13.4144 7.95605 13.2362 7.54432 13.2362 7.03837H9.23622Z"
                fill="#276899" mask="url(#path-4-inside-2)"/>
              <mask id="path-6-inside-3" fill="white">
              <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M11.9966 13.294C11.9966 13.7257 11.657 14.076 11.2368 14.076C10.8167 14.076 10.477 13.7257 10.477 13.294C10.477 11.1382 8.77279 9.38423 6.67801 9.38423C4.58323 9.38423 2.87898 11.1382 2.87898 13.294C2.87898 13.7257 2.53935 14.076 2.11918 14.076C1.69901 14.076 1.35938 13.7257 1.35938 13.294C1.35938 10.2757 3.74592 7.82031 6.67801 7.82031C9.6101 7.82031 11.9966 10.2757 11.9966 13.294ZM6.67808 1.76172C7.51614 1.76172 8.19769 2.55082 8.19769 3.52114C8.19769 4.49146 7.51614 5.28056 6.67808 5.28056C5.84001 5.28056 5.15847 4.49146 5.15847 3.52114C5.15847 2.55082 5.84001 1.76172 6.67808 1.76172ZM6.67778 7.03769C8.35391 7.03769 9.717 5.45949 9.717 3.51884C9.717 1.5782 8.35391 0 6.67778 0C5.00165 0 3.63856 1.5782 3.63856 3.51884C3.63856 5.45949 5.00165 7.03769 6.67778 7.03769Z"/>
              </mask>
              <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M11.9966 13.294C11.9966 13.7257 11.657 14.076 11.2368 14.076C10.8167 14.076 10.477 13.7257 10.477 13.294C10.477 11.1382 8.77279 9.38423 6.67801 9.38423C4.58323 9.38423 2.87898 11.1382 2.87898 13.294C2.87898 13.7257 2.53935 14.076 2.11918 14.076C1.69901 14.076 1.35938 13.7257 1.35938 13.294C1.35938 10.2757 3.74592 7.82031 6.67801 7.82031C9.6101 7.82031 11.9966 10.2757 11.9966 13.294ZM6.67808 1.76172C7.51614 1.76172 8.19769 2.55082 8.19769 3.52114C8.19769 4.49146 7.51614 5.28056 6.67808 5.28056C5.84001 5.28056 5.15847 4.49146 5.15847 3.52114C5.15847 2.55082 5.84001 1.76172 6.67808 1.76172ZM6.67778 7.03769C8.35391 7.03769 9.717 5.45949 9.717 3.51884C9.717 1.5782 8.35391 0 6.67778 0C5.00165 0 3.63856 1.5782 3.63856 3.51884C3.63856 5.45949 5.00165 7.03769 6.67778 7.03769Z"
                    fill="#276899"/>
              <path
                d="M9.99664 13.294C9.99664 12.677 10.4974 12.076 11.2368 12.076V16.076C12.8167 16.076 13.9966 14.7743 13.9966 13.294H9.99664ZM11.2368 12.076C11.9763 12.076 12.477 12.677 12.477 13.294H8.47703C8.47703 14.7743 9.65702 16.076 11.2368 16.076V12.076ZM12.477 13.294C12.477 10.0882 9.93116 7.38423 6.67801 7.38423V11.3842C7.61443 11.3842 8.47703 12.1882 8.47703 13.294H12.477ZM6.67801 7.38423C3.42486 7.38423 0.878985 10.0882 0.878985 13.294H4.87898C4.87898 12.1882 5.74159 11.3842 6.67801 11.3842V7.38423ZM0.878985 13.294C0.878985 12.677 1.3797 12.076 2.11918 12.076V16.076C3.699 16.076 4.87898 14.7743 4.87898 13.294H0.878985ZM2.11918 12.076C2.85866 12.076 3.35938 12.677 3.35938 13.294H-0.640625C-0.640625 14.7743 0.53936 16.076 2.11918 16.076V12.076ZM3.35938 13.294C3.35938 11.3258 4.9041 9.82031 6.67801 9.82031V5.82031C2.58774 5.82031 -0.640625 9.22548 -0.640625 13.294H3.35938ZM6.67801 9.82031C8.45192 9.82031 9.99664 11.3258 9.99664 13.294H13.9966C13.9966 9.22548 10.7683 5.82031 6.67801 5.82031V9.82031ZM6.67808 3.76172C6.43966 3.76172 6.29049 3.64498 6.23856 3.58485C6.18987 3.52848 6.19769 3.50036 6.19769 3.52114H10.1977C10.1977 1.73137 8.88574 -0.238281 6.67808 -0.238281V3.76172ZM6.19769 3.52114C6.19769 3.54192 6.18987 3.5138 6.23856 3.45743C6.29049 3.3973 6.43966 3.28056 6.67808 3.28056V7.28056C8.88574 7.28056 10.1977 5.31091 10.1977 3.52114H6.19769ZM6.67808 3.28056C6.9165 3.28056 7.06567 3.3973 7.1176 3.45743C7.16629 3.5138 7.15847 3.54192 7.15847 3.52114H3.15847C3.15847 5.31091 4.47042 7.28056 6.67808 7.28056V3.28056ZM7.15847 3.52114C7.15847 3.50036 7.16629 3.52848 7.1176 3.58485C7.06567 3.64498 6.9165 3.76172 6.67808 3.76172V-0.238281C4.47042 -0.238281 3.15847 1.73137 3.15847 3.52114H7.15847ZM6.67778 9.03769C9.72351 9.03769 11.717 6.27893 11.717 3.51884H7.717C7.717 4.02479 7.5388 4.43652 7.31234 4.69871C7.08913 4.95715 6.85839 5.03769 6.67778 5.03769V9.03769ZM11.717 3.51884C11.717 0.758752 9.72351 -2 6.67778 -2V2C6.85839 2 7.08913 2.08054 7.31234 2.33897C7.5388 2.60117 7.717 3.0129 7.717 3.51884H11.717ZM6.67778 -2C3.63206 -2 1.63856 0.758752 1.63856 3.51884H5.63856C5.63856 3.0129 5.81677 2.60117 6.04322 2.33897C6.26644 2.08054 6.49717 2 6.67778 2V-2ZM1.63856 3.51884C1.63856 6.27893 3.63206 9.03769 6.67778 9.03769V5.03769C6.49717 5.03769 6.26644 4.95715 6.04322 4.69871C5.81677 4.43652 5.63856 4.02479 5.63856 3.51884H1.63856Z"
                fill="#276899" mask="url(#path-6-inside-3)"/>
            </svg>
          </span>
          <div @click="switchViews()" class="btn-img">
            <svg v-if="!isList" content="List mode"
                 v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }"
                 class="switch-view switch-list"
                 width="23" height="16" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4.76953" y="0.5" width="14.2305" height="1.76923" rx="0.884615"/>
              <rect x="4.76953" y="6.26953" width="14.2305" height="1.76923" rx="0.884615"/>
              <rect x="4.76953" y="12.0391" width="14.2305" height="1.76923" rx="0.884615"/>
              <circle cx="1.5" cy="1.5" r="1.5"/>
              <circle cx="1.5" cy="7.19922" r="1.5"/>
              <circle cx="1.5" cy="13" r="1.5"/>
            </svg>
            <svg content="Card mode" v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }" v-else
                 class="switch-view"
                 width="27" height="27" viewBox="32 27 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="32" y="27" width="11" height="11" rx="1"/>
              <rect x="48" y="27" width="11" height="11" rx="1"/>
              <rect x="32" y="43" width="11" height="11" rx="1"/>
              <rect x="48" y="43" width="11" height="11" rx="1"/>
            </svg>
          </div>
        </div>
        <ul class="sort-tabs">
          <li>Filter by:</li>
          <li><label>
            <input @input="searchQueues()" v-model="searchName" class="input-field" type="text"
                   placeholder="Name/Num">
          </label></li>
          <li class="title-tabs" v-if="!isList">Sort by:</li>
          <li @click="indexQueue = 'sort'" :ref="'sort'" v-if="!isList">
            <label class="options-label">
              <input class="input-field input-with-direction num" type="text" :value="sortBy" readonly>
              <sort-direction :show="true" :is-desc="sortDirection" className="direction"/>
              <span @click="setShowList('showList', 'sort')" class="triangle"
                    :class="{'rotate-arrow': showList === 'sort'}">
                <img src="../../../assets/img/icons/select-arrow.svg" alt="select">
              </span>
              <ul v-show="showList === 'sort'" class="list-related-numbers">
                <li @click="sort('name', 'name')">Name
                  <sort-direction :show="sortBy === 'name'" :is-desc="sortDirection"/>
                </li>
                <li @click="sort('internalNumber', 'queue number')">Queue number
                  <sort-direction :show="sortBy === 'queue number'" :is-desc="sortDirection"/>
                </li>
                <li @click="sort('userCount', 'agents')">Agents
                  <sort-direction :show="sortBy === 'agents'" :is-desc="sortDirection"/>
                </li>
                <li @click="sort('dateUpdated', 'date updated')">Date Updated
                  <sort-direction :show="sortBy === 'date updated'" :is-desc="sortDirection"/>
                </li>
                <li @click="sort('strategy', 'strategy')">Strategy
                  <sort-direction :show="sortBy === 'strategy'" :is-desc="sortDirection"/>
                </li>
                <li @click="sort('timeout', 'dial time')">Dial time
                  <sort-direction :show="sortBy === 'dial time'" :is-desc="sortDirection"/>
                </li>
                <li @click="sort('ringinuse', 'ring in use')">Ring in use
                  <sort-direction :show="sortBy === 'ring in use'" :is-desc="sortDirection"/>
                </li>
              </ul>
            </label>
          </li>
        </ul>
      </div>
      <Paginator v-show="getPaginatorQueues.paginator.recordsPerPage" ref="paginator" perPage="9"
                 :paginator="getPaginatorQueues.paginator"
                 :methods="{page: 'setQueuePage', peerPage: 'setQueuePerPage'}"/>
      <div class="right-tabs">
        <ControlPanel :show="showApplyBtn" :apply="setApply" :discard="clearQueue"/>
      </div>
    </div>

    <div class="list-header-block" v-if="isList">
      <ul class="list-header">
        <li class="list-header-item header-name" @click="sort('name', 'name')">
          Name
          <img ref="name" src="@/assets/img/icons/sort-arrow.svg"/>
        </li>
        <li class="list-header-item header-number" @click="sort('internalNumber', 'queue number')">
          Number
          <img ref="queue number" src="@/assets/img/icons/sort-arrow.svg"/>
        </li>
        <li class="list-header-item header-agents" @click="sort('userCount', 'agents')">
          Agents
          <img ref="agents" src="@/assets/img/icons/sort-arrow.svg"/>
        </li>
        <li class="list-header-item header-created" @click="sort('dateUpdated', 'date updated')">
          Date Updated
          <img ref="date updated" src="@/assets/img/icons/sort-arrow.svg"/>
        </li>
      </ul>
      <ul class="list-header header-options-list">
        <li class="list-header-item header-strategy" @click="sort('strategy', 'strategy')">
          Strategy
          <img ref="strategy" src="@/assets/img/icons/sort-arrow.svg"/>
        </li>
        <li class="list-header-item header-timeout" @click="sort('timeout', 'dial time')">
          Dial time
          <img ref="dial time" src="@/assets/img/icons/sort-arrow.svg"/>
        </li>
        <li class="list-header-item header-ring-in-use" @click="sort('ringinuse', 'ring in use')">
          Ring in use
          <img ref="ring in use" src="@/assets/img/icons/sort-arrow.svg"/>
        </li>
        <li class="header-setting"></li>
      </ul>
    </div>

    <div class="data-container" ref="dataContainer">
      <div v-if="queuesListManage.length" class="queue-block">
        <div
          :class="{'dark-bottom': this.getPaginatorQueues.paginator.recordsPerPage < this.getPaginatorQueues.paginator.count}"
          class="deps"
          :style="{gap: isList ? '4px' : '20px'}">
          <div v-for="(queue, index) in queuesListManage" :key="index" class="dep-card"
                :class="{'dep-card-list': isList}">
            <div class="static" v-if="!isList">
              <div class="queue-title-block">
                <div class="queue-name-block">
                  <span class="queue-title">Name of Queue</span>
                  <h4 class="card-name">
                    <img content="Detail" ref="cogwheel"
                         v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }"
                         width="24" src="@/assets/img/icons/cogwheel.svg" alt="cogwheel" @click="viewQueue(queue)"
                         class="setting-btn"/>
                    <span class="name ellipsis">{{ queue.name }}</span>
                  </h4>
                </div>
                <div class="queue-number-block">
                  <span class="queue-title">Name of Queue</span>
                  <h4>{{ queue.internalNumber }}</h4>
                </div>
              </div>
              <table>
                <tbody>
                <tr>
                  <td>Agents in Queue:</td>
                  <td>{{ queue.relatedWith.user.length }}</td>
                </tr>
                </tbody>
              </table>
            </div>
            <ul class="static-list" v-else>
              <li class="static-list-item static-list-name ellipsis">{{ queue.name }}</li>
              <li class="static-list-item static-list-number">{{ queue.internalNumber }}</li>
              <li class="static-list-item static-list-agents">{{ queue.relatedWith.user.length }}</li>
              <li class="static-list-item static-list-created">{{ queue.dateUpdated }}</li>
            </ul>
            <div class="all-options"
                 :class="{'all-options-list': isList, 'disabled-events': !$access.isEditDepAndQueue(userInfo, 'queue', queue), 'disabled-gray-options-block': !$access.isEditDepAndQueue(userInfo, 'queue', queue)}">
              <div class="strategy-block options-block">
                <label class="strategy-label options-label" :ref="`${queue.uid}Strategy`"
                       @click="indexQueue = `${queue.uid}Strategy`">
                  <span class="options-title">Strategy:</span>
                  <input class="input-field num" type="text" :value="getStrategyTitle(queue.strategy)" readonly>
                  <span @click="setShowList('showList', `${queue.uid}strategy`)" class="triangle"
                        :class="{'rotate-arrow': showList == `${queue.uid}strategy`}">
                    <img src="../../../assets/img/icons/select-arrow.svg" alt="select">
                  </span>
                  <ul v-show="showList == `${queue.uid}strategy`" class="list-related-numbers">
                    <li @click="selectOptions(queue, 'selectedStrategy', 'Ring all')"
                        :content="'Calls all users at the same time.'"
                        v-tippy="{ placement: 'left', distance: '-35', arrow: true, delay: 50, duration: 500 }">Ring all
                    </li>
                    <li @click="selectOptions(queue, 'selectedStrategy', 'Least recent')"
                        :content="'Call the user who did not receive calls for the longest time.'"
                        v-tippy="{ placement: 'left', distance: '-35', arrow: true, delay: 50, duration: 500 }">Least
                      recent
                    </li>
                    <li @click="selectOptions(queue, 'selectedStrategy', 'Fewest calls')"
                        :content="'Call the user who received the least number of calls.'"
                        v-tippy="{ placement: 'left', distance: '-35', arrow: true, delay: 50, duration: 500 }">Fewest
                      calls
                    </li>
                    <li @click="selectOptions(queue, 'selectedStrategy', 'Random')"
                        :content="'Randomly distribution of the calls.'"
                        v-tippy="{ placement: 'left', distance: '-35', arrow: true, delay: 50, duration: 500 }">Random
                    </li>
                    <li @click="selectOptions(queue, 'selectedStrategy', 'RR memory')"
                        :content="'Calling in a circle, after the agent who answered last.'"
                        v-tippy="{ placement: 'left', distance: '-35', arrow: true, delay: 50, duration: 500 }">RR
                      memory
                    </li>
                    <li @click="selectOptions(queue, 'selectedStrategy', 'Linear')"
                        :content="'Call starting from the first in the listed order.'"
                        v-tippy="{ placement: 'left', distance: '-35', arrow: true, delay: 50, duration: 500 }">Linear
                    </li>
                  </ul>
                </label>
              </div>
              <div class="timeout options-block">
                <label class="timeout-label options-label" :ref="`${queue.uid}Timeout`"
                       @click="indexQueue = `${queue.uid}Timeout`">
                  <span class="options-title">Dial time:</span>
                  <input class="input-field num" type="text" :value="queue.timeout || 0" readonly>
                  <span @click="setShowList('showList', `${queue.uid}timeout`)" class="triangle"
                        :class="{'rotate-arrow': showList === `${queue.uid}timeout`}">
                    <img src="../../../assets/img/icons/select-arrow.svg" alt="select">
                  </span>
                  <ul v-show="showList === `${queue.uid}timeout`" class="list-related-numbers">
                    <li @click="selectOptions(queue, 'selectedTimeout', (index + 1))"
                        v-for="(value, index) in new Array(60).fill(0)" :key="index">{{ index + 1 }}
                    </li>
                  </ul>
                </label>
              </div>
              <div class="ring-in-use options-block">
                <label class="timeout-label options-label" :ref="`${queue.uid}Ring in use`"
                       @click="indexQueue = `${queue.uid}Ring in use`">
                  <span class="options-title">Ring in use:</span>
                  <input class="input-field num" type="text" :value="queue.ringinuse" readonly>
                  <span @click="setShowList('showList', `${queue.uid}ring-in-use`)" class="triangle"
                        :class="{'rotate-arrow': showList === `${queue.uid}ring-in-use`}">
                    <img src="../../../assets/img/icons/select-arrow.svg" alt="select">
                  </span>
                  <ul v-show="showList === `${queue.uid}ring-in-use`" class="list-related-numbers">
                    <li @click="selectOptions(queue, 'selectedRing', 'yes')">yes</li>
                    <li @click="selectOptions(queue, 'selectedRing', 'no')">no</li>
                  </ul>
                </label>
              </div>
              <img content="Detail" v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }" width="24"
                   src="@/assets/img/icons/cogwheel.svg" alt="cogwheel" @click="viewQueue(queue)"
                   v-if="isList" class="setting-img"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isList" class="paginator">
    </div>
  </div>
</template>

<script>
import {QueuesGettersApi} from '@/API/getters'
import SortDirection from '@/components/sort-direction'
import sortArrow from '@/assets/img/icons/sort-arrow.png'
import { mapGetters } from 'vuex'
import store from '@/store'
import observables from '@/store/observable.mutations'
import { QueuesParse } from '@/lib/parse.queues'
import ClickOutside from '@/lib/clickDirective'
import _ from 'lodash'
import { clickCheck } from '@/lib/clickCheck.js'
import Paginator from '@/components/Paginator'
import ControlPanel from '@/components/ControlPanel'
import { serverSort } from '@/lib/sort.js'

export default {
  name: 'Queues',
  components: {Paginator, ControlPanel, SortDirection},
  data() {
    return {
      unsubscribeStore: () => {
      },
      isList: false,
      sortBy: 'date updated',
      users: [],
      sortArrow: sortArrow,
      sortParam: {
        name: 'desc',
        'queue number': 'asc',
        'date updated': 'desc',
        agents: 'asc',
        strategy: 'desc',
        'dial time': 'desc',
        'ring in use': 'desc'
      },
      showApplyBtn: false,
      currentUids: [],
      showList: '',
      indexQueue: '',
      searchName: '',
    }
  },
  watch: {
    getGlobalQueuesList() {
      this.$store.dispatch('setQueues', JSON.parse(JSON.stringify(this.getGlobalQueuesList)))
    }
  },
  computed: {
    ...mapGetters(['queuesListManage', 'paginatorListManage', 'getGlobalQueuesList', 'getPaginatorQueues', 'getGlobalSearch', 'userInfo', 'getInitialManageQueuesList']),
    sortDirection: function () {
      return this.sortParam[this.sortBy] === 'desc'
    }
  },
  methods: {
    hideListOptions() {
      clickCheck(this, this.indexQueue, this.$refs)
    },
    hide() {
      this.showList = ''
    },
    getStrategyTitle(strategy) {
      switch (strategy) {
        case 'ringall':
          return 'Ring all'
        case 'leastrecent':
          return 'Least recent'
        case 'fewestcalls':
          return 'Fewest calls'
        case 'random':
          return 'Random'
        case 'rrmemory':
          return 'RR memory'
        case 'linear':
          return 'Linear'
        default:
          break;
      }
    },
    sort(string, sortBy) {
      if (this.$refs[this.sortBy]) {
        this.$refs[this.sortBy].style.transform = ''
      }
      this.sortBy = sortBy

      const dataSort = serverSort(this.fetch, this.$refs[sortBy], this.sortParam[sortBy], this.getPaginatorQueues.peerPage, string, this.getPaginatorQueues.page)
      this.sortParam[sortBy] = dataSort.order
      this.$refs[sortBy] = dataSort.refArrow
    },
    switchViews() {
      this.isList = !this.isList
    },
    onscroll() {
      window.addEventListener('scroll', this.funScroll)
    },
    deleteScroll() {
      window.removeEventListener('scroll', this.funScroll)
    },
    funScroll() {
      if (this.getPaginatorQueues.paginator.recordsPerPage < this.getPaginatorQueues.paginator.count) {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight - 30
        if (bottomOfWindow) {
          if (this.getPaginatorQueues.page !== Math.ceil(this.getPaginatorQueues.paginator.count / this.getPaginatorQueues.peerPage)) {
            this.$refs.paginator.setPeerPage(+this.getPaginatorQueues.peerPage + 12)
          }
        }
      }
    },
    viewQueue(queue) {
      QueuesGettersApi.viewQueue(queue.uid)
      localStorage.setItem('queueUid', queue.uid)
      this.$router.push(`/config/queues/queue-setting/${queue.name}`)
    },
    addNewQueue() {
      this.$router.push('/config/queues/create-queue')
    },
    setShowList(param, value) {
      if (this[param] === value) {
        this[param] = ''
      } else {
        this[param] = value
      }
    },
    selectOptions(queue, option, value) {
      let isInArray = false
      this.currentUids.forEach(element => {
        if (element.uid === queue.uid) {
          isInArray = true
        }
      })
      if (!isInArray) {
        this.currentUids.push(queue)
      }
      switch (option) {
        case 'selectedStrategy':
          this.$store.dispatch('setStrategy', {value: value.toLowerCase().split(' ').join(''), uid: queue.uid})
          break
        case 'selectedTimeout':
          this.$store.dispatch('setTimeout', {value: value, uid: queue.uid})
          break
        case 'selectedRing':
          this.$store.dispatch('setRinginuse', {value: value.toLowerCase().split(' ').join(''), uid: queue.uid})
          break
        default:
          break
      }
      this.showList = ''
    },
    clearQueue() {
      this.fetch(this.getPaginatorQueues.peerPage, this.sortBy)
    },
    setApply() {
      if (this.currentUids.length !== 0) {
        const queue = JSON.parse(JSON.stringify(this.currentUids[0]))//избавляемся от обзерверов
        const queueParse = QueuesParse(queue)
        this.$store.dispatch('updateQueuesInList', queueParse)
          .then(() => {
            this.currentUids.shift()
            this.setApply()
          })
      }
    },
    searchQueues() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => this.fetch(this.getPaginatorQueues?.peerPage || 9, this.sortBy, this.getPaginatorQueues.page, 'asc', this.searchName), 800)
    },
    fetch(peerPage, sortParam, page, order, search = '') {
      let searchParam = ''
      if (this.getGlobalSearch.value && (this.getGlobalSearch.key === 'queue' || this.getGlobalSearch.key === 'all')) {
        searchParam = this.getGlobalSearch.value
      } else {
        searchParam = search
      }
      this.$store.dispatch('setGlobalQueuesList', {peerPage, sort: sortParam, page, search: searchParam, order})
    }
  },
  created() {
    this.fetch(9, this.sortBy, this.getPaginatorQueues.page, 'asc')
    this.onscroll()
  },
  mounted() {
    this.unsubscribeStore = store.subscribe((mutation) => {

      if (observables.paginator.queues.includes(mutation.type)) {
        this.fetch(this.getPaginatorQueues.peerPage, this.sortBy, this.getPaginatorQueues.page, 'asc')
      }
      if (observables.queues.includes(mutation.type)) {
        for (let i = 0; i < this.getInitialManageQueuesList.length; i++) {
          if (!_.isEqual(this.getInitialManageQueuesList[i], this.queuesListManage[i])) {
            this.showApplyBtn = true
            break
          } else this.showApplyBtn = false
        }
      }
      else if(mutation.type === 'globalQueuesListMutation') this.showApplyBtn = false
      // else if (mutation.type !== 'setTheme') this.showApplyBtn = false
    })
    this.popupItem = this.$el.children[0]
  },
  beforeDestroy() {
    this.deleteScroll()
    this.unsubscribeStore()
  },
  directives: {
    ClickOutside
  }
}
</script>

<style scoped lang="scss">
.get-users-page-container {
  position: relative;
  width: 100%;
}

.toolbar {
  margin-bottom: 12px;
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: var(--toolbar-bg);
  padding-left: 5px;
  border-radius: 8px;
  height: 48px;
  position: relative;

  .right-tabs {
    position: absolute;
    right: 0;
    z-index: 1001;
    top: -30px;
  }

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .btn-img {
    cursor: pointer;
    border-radius: 8px;
    justify-content: space-between;
    width: 125px;

    .btn-img {
      cursor: pointer;
      width: 57px;
      height: 48px;
      border-radius: 8px;
      display: flex;
      justify-content: center !important;
      align-items: center;
      background-color: var(--paginator-bg);
      transition: transform .3s ease;
      margin-left: 9px;

      &:hover {
        transform: scale(1.1);
      }

      .switch-view {
        fill: var(--light-blue);
        outline: none;
      }
    }

    .add-btns {
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: .3s ease;
      width: 57px;
      max-width: 57px;
      height: 48px;
      background-color: var(--paginator-bg);
      border-radius: 8px;
      padding: 0 7px 0 7px;

      .add-btn-plus {
        margin-right: -2px;
        margin-left: -2px;
        margin-top: -5px;
      }

      &:hover {
        transition: .3s ease;
        transform: scale(1.2, 1.2);
        overflow: hidden;
      }
    }

    img:nth-child(1) {
      margin-right: 10px;
      margin-bottom: -5px;
    }

  }
}

.list-header-block {
  background: var(--light-blue);
  height: 44px;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 35px;
  padding-right: 26px;
  margin-bottom: 17px;

  .list-header {
    width: 63%;
    display: flex;
    align-items: center;
  }

  .header-options-list {
    width: 36%;
  }

  .list-header-item {
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    cursor: pointer;
  }

  .header-name {
    width: 30%;
    text-align: left;
  }

  .header-number {
    width: 15%;
    text-align: center;
  }

  .header-agents {
    width: 25%;
    text-align: center;
  }

  .header-created {
    width: 30%;
    text-align: center;
  }

  .header-strategy {
    width: 110px;
    margin-right: 8%;
    text-align: left;
  }

  .header-timeout {
    width: 110px;
    margin-right: 8%;
    text-align: left;
  }

  .header-ring-in-use {
    width: 100px;
    margin-right: 12%;
    text-align: left;
  }

  .header-setting {
    display: block;
    height: 16px;
    width: 24px;
    margin-right: 8%;
  }
}

.data-container p {
  padding: 24px;
}

.deps {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;

  .dep-card-list {
    width: 100% !important;
    display: flex;
    align-items: center;
    padding: 12px 26px 13px 33px !important;
    margin-bottom: 4px !important;
  }

  .dep-card {
    width: calc((100% - 40px) / 3);
    padding: 14px 19px 15px 18px;
    background: var(--substrate);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    border: 2px solid var(--cdr-border-row);
    border-radius: 4px;
    position: relative;

    h4 {
      font-size: 32px;
      font-weight: 300;

      .setting-btn {
        transition: .3s ease;
        cursor: pointer;
        border-radius: 50%;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);

        &:hover {
          transform: scale(1.3, 1.3);
        }
      }
    }

    .static {
      margin-bottom: 11px;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: 0;
        background: var(--line-dep-queue);
        border-radius: 2px;
      }

      .queue-title-block {
        display: flex;
        align-items: center;
        justify-content: space-between;

        h4 {
          color: var(--font-panel);
        }

        .card-name {
          .name {
            margin-left: 8px;
            max-width: 176px;
          }
        }

        .queue-title {
          display: inline-block;
          font-weight: 300;
          font-size: 14px;
          line-height: 16px;
          color: #8B9095;
          margin-bottom: 8px;
        }

        .queue-number-block {
          h4 {
            text-align: end;
          }
        }
      }
    }

    .static-list {
      display: flex;
      align-items: center;
      width: 63%;
      color: var(--font-panel);
    }

    .static-list-name {
      width: 30%;
      text-align: left;
    }

    .static-list-number {
      width: 15%;
      text-align: center;
    }

    .static-list-agents {
      width: 25%;
      text-align: center;
    }

    .static-list-created {
      width: 30%;
      text-align: center;
    }

    table {
      margin-top: 24px;
    }

    td {
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 19px;
      color: #8B9095;
      padding-bottom: 12px;

      &:nth-child(2) {
        padding-left: 50px;
        color: var(--font-panel);
      }
    }

    .all-options {
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      .options-block {
        display: inline-block;
        width: 110px;
        margin-right: 7px;
        margin-bottom: 8px;
        position: relative;

        .options-label {
          .input-field {
            padding-left: 12px;
            color: white;
          }

          .triangle {
            width: calc(100% - 7px);
          }

          .list-related-numbers {
            width: 100%;
            max-height: 150px;
            overflow: auto;
          }
        }
      }
    }

    .all-options-list {
      width: 36%;

      .options-title {
        display: none;
      }

      .options-block {
        margin-bottom: 0;
        margin-right: 8%;
      }

      .ring-in-use {
        margin-right: 12%;
      }

      .setting-img {
        transition: .3s ease;
        transform: scale(1, 1);
        cursor: pointer;

        &:hover {
          transition: .3s ease;
          transform: scale(1.3, 1.3);
        }
      }
    }
  }
}


.deps button {
  background: transparent;
  color: #6d6d6d;
  text-transform: uppercase;
  border: 1px solid #6d6d6d;
  border-radius: 2px;
  font-size: 14px;
  line-height: 16px;
}

.toolbar {
  padding: 24px 0;
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;

  .sort-tabs {
    .title-tabs {
      font-weight: 500;
      border-radius: 8px;
      color: var(--white);
    }
    .input-field {
      width: 120px;
      height: 24px;
      color: #FFFFFF;
      background: var(--scenario-vnumber-input-bg);
    }
    .options-label {
      .input-field {
        width: 120px;
        height: 24px;
        font-size: 16px;
        margin-top: 0;
        // color: var(--font-panel);
        color: white;
        background: var(--scenario-vnumber-input-bg);
        text-transform: capitalize;

        &.input-with-direction {
          padding-right: 35px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      .direction {
        position: absolute;
        right: 35px;
        top: calc(50% - 5px);
      }

      .triangle {
        width: 113px;
        height: 24px;
        bottom: 5px;
      }

      .list-related-numbers {
        width: 120px;
        background: var(--scenario-vnumber-input-bg);

        li {
          border-radius: 0;
          margin-right: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
    }

    li {
      position: relative;
    }
  }
}

.btn-add {
  border: none;
  padding: 10px 12px 10px 46px;
  font-weight: 500;
  font-size: 18px;
  background: var(--light-blue);
  border-radius: 8px;
  color: var(--white);
  cursor: pointer;
  outline: none;
  position: relative;
  transition: all 0.5s ease-out;
}

.btn-add:hover {
  background: #386e97;
}

.btn-add:before {
  content: "";
  left: 12px;
  position: absolute;
  background-image: url("../../../assets/img/icons/upload-img-plus.svg");
  width: 24px;
  height: 24px;
}


@media (min-width: 2561px) {
  .deps {
    .dep-card {
      width: calc((100% - 80px) / 5);
    }
  }
}

@media (max-width: 2560px) {
  .deps {
    .dep-card {
      width: calc((100% - 60px) / 4);
    }
  }
}

@media (max-width: 2100px) {

  .deps {
    .dep-card {
      width: calc((100% - 40px) / 3);
    }
  }
}


@media screen and (max-width: 1730px) {

  .deps {
    .dep-card {
      .all-options {
        .options-block {
          width: 100px;
          margin-right: 7% !important;

          .options-label {
            .input-field {
              width: 100px !important;
            }
            .triangle {
              width: calc(100% - 7px);
            }
          }       
        }
      }
    }
  }
}


@media (max-width: 1600px) {
  .list-header-block {
    .header-ring-in-use {
      margin-right: 10%;
    }
  }

  .all-options-list {
    .options-block {
      width: 95px;
      margin-right: 6% !important;

      .input-field {
        width: 110px !important;
      }
    }
  }

  .deps {
    .dep-card {
      .all-options {
        .options-block {
          margin-right: 5% !important;
        }
      }
    }
  }
}

@media (max-width: 1504px) {
  .deps {
    .dep-card {
      width: calc((100% - 40px) / 3);
      .static-list-created {
        display: none;
      }
      .static-list {
        width: 50%;
      }
      .all-options-list {
        width: 50%;
      }
      .static-list-name {
        width: 35%;
      }
      .static-list-number {
        width: 25%;
      }
      .static-list-agents {
        width: 40%;
      }
      .all-options {
        .options-block {
          margin-right: 2% !important;
        }
      }
    }
  }
  .list-header-block {
    .list-header {
      width: 50%;
    }
    .header-options-list {
      width: 50%;
    }
    .header-created {
      display: none;
    }
    .header-name {
      width: 35%;
    }
    .header-number {
      width: 25%;
    }
    .header-agents {
      width: 40%;
    }
    .header-timeout {
      margin-right: 0;
    }
    .header-strategy {
      margin-right: 0;
    }
  }
}

@media (max-width: 1408px) {
  .deps {
    .dep-card {
      width: calc((100% - 20px) / 2);
    }
  }
}

</style>
