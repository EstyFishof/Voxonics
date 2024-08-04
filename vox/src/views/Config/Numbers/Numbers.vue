<template>
  <div class="get-users-page-container" @click="hideListOptions($event); indexRef='false'" v-click-outside="hide">
    <div class="nav-local">
      <router-link to="/config/external-numbers/info" class="nav-local-item">Available V-Numbers</router-link>
      <router-link to="/config/external-numbers/departments" class="nav-local-item">Numbers of Departments</router-link>
      <transition name="apply">
        <ControlPanel :show="showApplyBtn" :apply="applyChanges" :discard="clearChanges"/>
      </transition>
    </div>
    <div class="hr"></div>
    <div class="toolbar">
      <div>
        <div class="batch-actions-block" @click="indexRef = `batchActions`">
          <svg :class="{batch: clickedNumbers.length >= 2}" @click="showBatchActions = !showBatchActions"
               class="btn-img" width="41" height="42" viewBox="0 0 41 42"
               fill="none" xmlns="http://www.w3.org/2000/svg" content="Batch action"
               v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }">
            <path
              d="M15.1933 5.45822C15.2116 5.48498 15.2299 5.50282 15.2574 5.51174C15.3214 5.64554 15.4129 5.75258 15.5593 5.8061C15.5959 5.84178 15.6325 5.87746 15.669 5.91314C15.669 5.96665 15.6873 5.9845 15.7422 5.9845C15.9984 6.43049 16.3277 6.27885 16.6571 6.09153C16.9956 6.11829 16.9132 5.86854 16.9132 5.69906C16.9224 4.88735 16.9132 4.08456 16.9132 3.27285C18.5233 3.26393 20.1335 3.26393 21.7436 3.24609C21.9723 3.24609 22.018 3.34421 22.018 3.54045C22.0089 4.25404 22.018 4.96763 22.018 5.6723C22.018 5.8507 21.9631 6.04693 22.2467 6.12721C22.512 6.19857 22.7407 6.25209 22.9512 6.0291C23.3445 5.60094 23.7654 5.19062 24.1496 4.74463C24.3417 4.52163 24.4606 4.55731 24.6527 4.74463C25.6774 5.7615 26.702 6.76944 27.7449 7.75955C27.9919 7.99147 27.937 8.12526 27.7175 8.3215C27.2783 8.71398 26.8575 9.12429 26.4275 9.51676C26.2812 9.65056 26.1165 9.74868 26.2629 9.99844C26.3818 10.2036 26.4275 10.3998 26.766 10.3909C27.4796 10.3552 28.1932 10.3909 28.9067 10.3731C29.172 10.3642 29.2361 10.4534 29.2361 10.7031C29.2269 12.1749 29.2269 13.6377 29.2361 15.1095C29.2361 15.3771 29.1721 15.4663 28.8793 15.4574C28.1474 15.4396 27.4156 15.4485 26.6928 15.4574C26.5465 15.4574 26.3269 15.3771 26.3086 15.6358C26.2903 15.9302 25.8695 16.171 26.208 16.5189C26.702 17.0184 27.1686 17.5447 27.6626 18.0531C27.8364 18.2315 27.8913 18.3474 27.6809 18.5526C26.6288 19.5605 25.5859 20.5685 24.5521 21.5943C24.36 21.7905 24.2502 21.7459 24.0856 21.5675C23.6464 21.1037 23.1707 20.6577 22.7316 20.1849C22.5761 20.0155 22.448 20.0065 22.265 20.0957C22.0729 20.1939 21.8259 20.2028 21.8351 20.5239C21.8625 21.1037 21.8351 21.6835 21.8442 22.2543C21.8442 22.4773 21.7802 22.5665 21.5332 22.5665C20.042 22.5576 18.5508 22.5576 17.0596 22.5665C16.7577 22.5665 16.7028 22.4506 16.712 22.1919C16.7303 21.6746 16.712 21.1572 16.7211 20.6309C16.7211 20.4347 16.7485 20.2295 16.4741 20.176C16.1905 20.1225 15.9252 19.8371 15.605 20.1493C15.1201 20.622 14.6078 21.0591 14.123 21.5229C13.9492 21.6835 13.8302 21.6835 13.6747 21.5051C12.7324 20.4169 11.6621 19.4535 10.6557 18.4277C10.4087 18.178 10.4453 18.0531 10.6649 17.839C11.1315 17.393 11.5523 16.9024 12.028 16.4653C12.4122 16.1086 12.0188 15.8499 11.9822 15.5466C11.9457 15.2701 11.7169 15.3593 11.5523 15.3593C10.9576 15.3504 10.363 15.3504 9.77749 15.3593C9.56708 15.3593 9.48474 15.3058 9.48474 15.0828C9.49389 13.6021 9.49389 12.1124 9.48474 10.6317C9.48474 10.3731 9.59453 10.3463 9.81409 10.3463C10.4087 10.3552 11.0034 10.3196 11.5889 10.3642C11.9274 10.382 11.9731 10.1679 12.092 9.97168C12.2293 9.74868 12.1012 9.61488 11.964 9.47216C11.5523 9.06185 11.1497 8.6337 10.7289 8.2323C10.5368 8.05391 10.5551 7.93795 10.7381 7.75955C11.8176 6.74268 12.8971 5.72582 13.9675 4.69111C14.1504 4.51272 14.2693 4.56623 14.4157 4.70895C14.6353 4.93195 14.864 5.14603 15.0927 5.36902C15.1384 5.41362 15.1659 5.43146 15.1933 5.45822ZM18.377 5.86854C18.377 6.26993 18.377 6.59105 18.377 6.92108C18.377 7.08164 18.3495 7.21544 18.1483 7.2422C17.3981 7.33139 16.712 7.60791 16.0807 8.00038C15.8795 8.12526 15.7514 8.0539 15.605 7.91119C15.2025 7.50979 14.7817 7.11732 14.3791 6.71592C14.2511 6.58213 14.1504 6.55537 14.004 6.69809C13.6198 7.08164 13.2264 7.44735 12.8331 7.82199C12.6775 7.97363 12.6409 8.0985 12.8239 8.26798C13.1624 8.5891 13.4643 8.94589 13.8028 9.25809C14.0406 9.47216 14.0406 9.6684 13.876 9.91816C13.5283 10.4266 13.2264 10.9618 13.1715 11.5862C13.1532 11.8003 13.016 11.8092 12.8605 11.8092C12.3573 11.8092 11.8542 11.8181 11.351 11.8003C11.0857 11.7913 10.9668 11.8449 10.9759 12.1392C11.0034 12.6387 10.9942 13.1472 10.9759 13.6556C10.9668 13.8964 11.0674 13.9589 11.2961 13.9499C11.8084 13.941 12.3299 13.9499 12.8513 13.941C13.016 13.941 13.1441 13.9589 13.1715 14.164C13.2813 14.9044 13.5283 15.6001 13.9491 16.2334C14.0772 16.4297 14.004 16.5635 13.8577 16.7062C13.4643 17.0987 13.0892 17.509 12.6867 17.8836C12.4854 18.0709 12.4763 18.2047 12.6775 18.392C13.0435 18.731 13.4002 19.0789 13.7296 19.4446C13.9309 19.6676 14.0772 19.6587 14.2876 19.4624C14.681 19.0967 15.1018 18.7488 15.4952 18.3742C15.6599 18.2226 15.788 18.2226 15.9709 18.3385C16.5564 18.6953 17.1694 18.9718 17.8647 19.0521C18.1117 19.0789 18.2306 19.177 18.2123 19.4535C18.1848 19.8995 18.2214 20.3455 18.2031 20.7915C18.194 21.068 18.3038 21.1572 18.5782 21.1483C19.0814 21.1304 19.5845 21.1304 20.0877 21.1483C20.3347 21.1572 20.4079 21.068 20.3988 20.8361C20.3896 20.3723 20.3896 19.9173 20.3988 19.4535C20.3988 19.2929 20.3713 19.1145 20.6183 19.0878C21.3319 19.0075 21.9448 18.6775 22.5303 18.3118C22.7407 18.1869 22.8688 18.2226 23.0335 18.401C23.3811 18.7756 23.7562 19.1235 24.1038 19.4981C24.296 19.7033 24.4332 19.7033 24.6253 19.507C24.9455 19.1681 25.284 18.847 25.6225 18.5348C25.8054 18.3653 25.8603 18.2315 25.6499 18.0263C25.2474 17.6249 24.8815 17.1879 24.4698 16.7865C24.296 16.617 24.2685 16.4743 24.3966 16.278C24.7991 15.6893 25.0278 15.0292 25.1285 14.3335C25.1651 14.0927 25.2748 14.0124 25.5218 14.0213C26.1622 14.0391 26.8026 14.0124 27.4339 14.0302C27.69 14.0391 27.7815 13.9678 27.7723 13.7091C27.754 13.1739 27.754 12.6387 27.7723 12.1035C27.7815 11.8627 27.69 11.8003 27.4613 11.8003C26.8392 11.8092 26.2171 11.8003 25.595 11.8092C25.4212 11.8092 25.2565 11.8359 25.2291 11.5862C25.1651 10.9261 24.8357 10.382 24.4698 9.8468C24.3051 9.61488 24.3417 9.46325 24.5521 9.28485C24.9272 8.95481 25.2565 8.58018 25.6408 8.2769C25.9244 8.05391 25.8603 7.92011 25.6408 7.72387C25.3206 7.42952 25.0004 7.12624 24.7076 6.80512C24.4881 6.56429 24.3509 6.62673 24.1679 6.83188C23.8568 7.17976 23.5184 7.49195 23.2165 7.84875C23.0152 8.08067 22.8505 8.09851 22.6035 7.93795C22.0546 7.59007 21.4783 7.2868 20.8104 7.22436C20.5909 7.20652 20.5543 7.07272 20.5543 6.8854C20.5634 6.43941 20.5543 5.99341 20.5543 5.54742C20.5543 4.67327 20.5543 4.66435 19.6577 4.66435C19.2461 4.66435 18.7155 4.53056 18.4684 4.73571C18.1848 4.98547 18.4227 5.52958 18.377 5.86854Z"
              fill="#276899"/>
            <path
              d="M1.66258 20.9907C3.67522 22.0075 5.56894 22.962 7.4718 23.9253C11.1677 25.7985 14.8637 27.6806 18.5596 29.5627C18.889 29.7321 19.1451 29.7411 19.4836 29.5716C25.119 26.7172 30.7544 23.8718 36.3898 21.0263C37.3047 20.5625 38.2195 20.1076 39.2167 19.6081C38.5122 19.2602 37.881 18.9391 37.2406 18.618C36.2526 18.1274 35.2737 17.6368 34.2765 17.164C34.0021 17.0392 33.9655 16.9232 34.1027 16.6645C34.5967 15.7101 34.5876 15.7012 35.5665 16.1828C37.2315 17.0035 38.8965 17.833 40.5706 18.6447C40.8451 18.7785 40.8908 18.9391 40.9366 19.2156C41.0738 20.0719 40.717 20.5001 39.9211 20.8925C36.1337 22.739 32.3828 24.6656 28.6228 26.5656C25.5124 28.1355 22.3928 29.6965 19.2915 31.2664C19.0445 31.3912 18.8707 31.3288 18.6603 31.2218C15.1747 29.4467 11.6892 27.6806 8.19452 25.9144C6.95949 25.29 5.69701 24.7013 4.47113 24.0591C3.09888 23.3455 1.73577 22.623 0.345216 21.954C0.116507 21.847 0.0158712 21.7132 0.0158712 21.4456C0.0158712 20.17 0.00672509 20.17 1.19601 19.5902C2.28467 19.055 3.36418 18.5199 4.44369 17.9757C4.6724 17.8598 4.76388 17.8776 4.89195 18.1095C5.44086 19.1086 5.45001 19.0996 4.41624 19.6081C3.538 20.0541 2.6506 20.5001 1.66258 20.9907Z"
              fill="#276899"/>
            <path
              d="M40.9273 29.9721C41.1926 30.8374 40.6986 31.1852 39.9759 31.5331C37.6339 32.657 35.3285 33.8523 33.014 35.0208C28.4581 37.3132 23.9113 39.6056 19.3646 41.9069C19.1176 42.0318 18.9346 42.0318 18.6876 41.9069C12.6314 38.8296 6.56599 35.7522 0.491473 32.6927C0.152983 32.5232 -0.0116852 32.3448 0.0249084 31.9524C0.0706502 31.4974 0.0432029 31.0336 0.0340545 30.5787C0.0249061 30.3646 0.0980909 30.2754 0.317652 30.3022C0.345097 30.3022 0.381691 30.3022 0.409136 30.3022C0.756774 30.3111 1.18675 30.2041 1.42461 30.3646C1.65332 30.5252 1.49779 30.9712 1.49779 31.2923C1.49779 31.5242 1.59843 31.6312 1.79054 31.7294C5.25778 33.4777 8.71587 35.2349 12.174 36.9832C14.3055 38.0625 16.4279 39.1418 18.5504 40.23C18.8797 40.3995 19.1359 40.4173 19.4744 40.2478C23.8473 38.0268 28.2202 35.8236 32.5931 33.6115C34.7247 32.5411 36.8471 31.4528 38.9878 30.4003C39.3721 30.213 39.491 29.99 39.4727 29.5886C39.4361 28.875 39.4636 28.875 40.1588 28.875C40.9273 28.875 40.9273 28.875 40.9273 29.6064C40.9273 29.7313 40.9273 29.8562 40.9273 29.9721Z"
              fill="#276899"/>
            <path
              d="M0.034102 27.8279C0.034102 26.6862 0.0341008 26.6951 1.20509 26.7308C1.46125 26.7397 1.54358 26.8289 1.49784 27.043C1.30573 27.8547 1.78144 28.1847 2.44928 28.5147C7.83767 31.2175 13.1986 33.9469 18.5687 36.6764C18.9072 36.8459 19.1634 36.837 19.4927 36.6764C25.1189 33.8221 30.7544 30.9855 36.3898 28.1401C37.2497 27.703 38.1096 27.257 38.9787 26.8378C39.3355 26.6683 39.5002 26.4899 39.4728 26.0707C39.427 25.3125 39.4636 25.3125 40.2412 25.3125C40.9182 25.3125 40.9182 25.3125 40.9182 25.9904C40.9182 26.2758 40.8816 26.5613 40.9273 26.8378C41.0097 27.3373 40.7718 27.5603 40.3419 27.7744C36.4355 29.7278 32.5474 31.6991 28.6502 33.6615C25.5306 35.2314 22.4019 36.8013 19.2823 38.389C19.0536 38.505 18.8981 38.4515 18.6968 38.3533C15.193 36.5783 11.6983 34.7943 8.19446 33.0282C6.94113 32.3949 5.6878 31.7883 4.43447 31.155C3.1354 30.5039 1.85463 29.7992 0.546409 29.1659C0.14388 28.9696 -0.0390851 28.7466 0.034102 28.3185C0.0615471 28.1579 0.034102 27.9974 0.034102 27.8279Z"
              fill="#276899"/>
            <path
              d="M40.9278 22.8817C41.184 23.7202 40.6991 24.0591 39.9947 24.407C33.481 27.6538 26.9857 30.9364 20.4812 34.21C20.3165 34.2902 20.1519 34.3616 20.0055 34.4686C19.3285 34.9949 18.7064 34.8522 17.9837 34.4686C16.465 33.648 14.8824 32.9255 13.3455 32.1227C9.24699 29.9909 5.12107 27.9125 0.986004 25.852C0.208392 25.4685 -0.0477638 25.0492 0.00712643 24.2465C0.0803134 23.1761 0.0254198 23.1761 1.14152 23.185C1.41597 23.185 1.56235 23.2474 1.48916 23.5239C1.31535 24.2911 1.73617 24.6122 2.3857 24.9333C7.7741 27.636 13.1442 30.3655 18.5143 33.1039C18.8802 33.2912 19.1547 33.2912 19.5206 33.1039C23.8752 30.8918 28.239 28.6886 32.6028 26.4853C34.7161 25.415 36.8293 24.3357 38.9609 23.292C39.3451 23.1047 39.4824 22.8996 39.4641 22.4892C39.4275 21.7578 39.4549 21.7578 40.1777 21.7578C40.9187 21.7578 40.9187 21.7578 40.9187 22.4714C40.9278 22.6141 40.9278 22.7479 40.9278 22.8817Z"
              fill="#276899"/>
            <path
              d="M19.2828 0C22.2835 0.0267596 25.0829 0.927666 27.5529 2.79192C27.8365 3.006 27.864 3.13087 27.617 3.40739C26.9674 4.1299 26.9857 4.12098 26.199 3.59471C22.009 0.829547 17.6818 0.588712 13.2357 2.94356C12.696 3.22899 12.202 3.62147 11.7079 3.98718C11.525 4.12098 11.4335 4.1299 11.2688 3.96042C10.4455 3.06844 10.4363 3.05952 11.4426 2.37269C13.7572 0.793869 16.3553 0.0267596 19.2828 0Z"
              fill="#276899"/>
            <path
              d="M5.7614 12.5122C5.7797 10.1484 6.71284 7.4635 8.56081 5.0819C8.79867 4.77862 8.96334 4.68942 9.29268 5.00162C9.97881 5.63493 9.98796 5.60817 9.45735 6.35744C7.14281 9.55967 6.55732 13.0295 7.75575 16.7848C8.18573 18.1317 8.89015 19.3358 9.78669 20.4241C9.98795 20.6738 9.96966 20.7898 9.72266 20.986C8.87186 21.6729 8.8627 21.6907 8.23147 20.8076C6.57561 18.5063 5.74311 15.9552 5.7614 12.5122Z"
              fill="#276899"/>
            <path
              d="M32.6484 13.2649C32.621 16.262 31.6787 18.9469 29.8033 21.3285C29.5837 21.605 29.4465 21.6318 29.172 21.3909C28.431 20.7487 28.4219 20.7665 28.9982 19.9816C32.0995 15.7625 32.0721 10.2143 28.6689 5.98631C28.4219 5.68304 28.4676 5.55816 28.7512 5.33516C29.5471 4.71077 29.5563 4.69293 30.1509 5.49572C31.4866 7.32429 32.2916 9.3491 32.5478 11.5791C32.6027 12.141 32.6393 12.703 32.6484 13.2649Z"
              fill="#276899"/>
            <path
              d="M19.2736 26.312C16.1448 26.2763 13.3454 25.3932 10.8753 23.5379C10.5826 23.3149 10.546 23.1722 10.8022 22.8867C11.4425 22.1821 11.4334 22.1642 12.1927 22.7083C13.6107 23.7341 15.2025 24.412 16.9133 24.7688C19.2095 25.2505 21.46 24.9472 23.6373 24.1088C24.7351 23.6895 25.7415 23.1097 26.6471 22.3872C26.8667 22.2177 26.9856 22.1999 27.1961 22.4229C27.9554 23.2703 27.9737 23.2614 27.0314 23.9036C24.6894 25.4913 22.0913 26.2585 19.2736 26.312Z"
              fill="#276899"/>
            <path :class="{batch: clickedNumbers.length >= 2}"
                  d="M15.1934 5.46003C15.166 5.43327 15.1385 5.41543 15.1202 5.38867C15.1385 5.41543 15.166 5.43327 15.1934 5.46003Z"
                  fill="#A0CFF9"/>
            <path :class="{batch: clickedNumbers.length >= 2}"
                  d="M18.377 5.86808C18.4227 5.52913 18.1849 4.98502 18.4776 4.7531C18.7246 4.55686 19.2644 4.68174 19.6669 4.68174C20.5635 4.68174 20.5635 4.68174 20.5635 5.56481C20.5635 6.0108 20.5726 6.45679 20.5635 6.90279C20.5635 7.09011 20.6001 7.2239 20.8196 7.24174C21.4874 7.30418 22.0638 7.60746 22.6127 7.95533C22.8689 8.11589 23.0335 8.09805 23.2256 7.86613C23.5184 7.50934 23.866 7.19714 24.1771 6.84927C24.36 6.64411 24.4973 6.58167 24.7168 6.82251C25.0096 7.14363 25.3298 7.4469 25.65 7.74126C25.8695 7.93749 25.9244 8.07129 25.65 8.29429C25.2657 8.59756 24.9364 8.9722 24.5613 9.30223C24.36 9.48063 24.3234 9.62335 24.479 9.86419C24.8449 10.3905 25.1834 10.9435 25.2383 11.6036C25.2657 11.8444 25.4304 11.8266 25.6042 11.8266C26.2263 11.8266 26.8484 11.8355 27.4705 11.8176C27.7083 11.8087 27.7907 11.8801 27.7815 12.1209C27.7632 12.6561 27.7632 13.1913 27.7815 13.7265C27.7907 13.9852 27.69 14.0565 27.443 14.0476C26.8027 14.0298 26.1623 14.0565 25.531 14.0387C25.284 14.0298 25.1742 14.11 25.1377 14.3509C25.0279 15.0466 24.7992 15.7067 24.4058 16.2954C24.2777 16.4827 24.3051 16.6344 24.479 16.8038C24.8815 17.2052 25.2474 17.6423 25.6591 18.0437C25.8695 18.2489 25.8146 18.3827 25.6317 18.5521C25.2932 18.8733 24.9547 19.1944 24.6345 19.5244C24.4424 19.7206 24.3051 19.7296 24.113 19.5155C23.7654 19.1409 23.3903 18.793 23.0427 18.4183C22.878 18.2399 22.7499 18.1953 22.5395 18.3291C21.9449 18.6949 21.3411 19.0249 20.6275 19.1052C20.3805 19.1319 20.4079 19.3103 20.4079 19.4709C20.4079 19.9347 20.3988 20.3896 20.4079 20.8535C20.4171 21.0765 20.3348 21.1746 20.0969 21.1657C19.5937 21.1478 19.0906 21.1567 18.5874 21.1657C18.313 21.1746 18.2032 21.0765 18.2123 20.8089C18.2306 20.3629 18.194 19.9169 18.2215 19.4709C18.2398 19.1944 18.13 19.0963 17.8738 19.0695C17.1786 18.9892 16.5565 18.7127 15.9801 18.3559C15.7972 18.2399 15.6599 18.2489 15.5044 18.3916C15.111 18.7573 14.6902 19.1052 14.2968 19.4798C14.0864 19.676 13.94 19.676 13.7388 19.462C13.4094 19.0963 13.0526 18.7484 12.6867 18.4094C12.4854 18.2221 12.4946 18.0883 12.6959 17.901C13.0984 17.5174 13.4735 17.116 13.8668 16.7236C14.0041 16.5808 14.0864 16.447 13.9583 16.2508C13.5467 15.6175 13.2905 14.9218 13.1807 14.1814C13.1533 13.9762 13.0252 13.9584 12.8605 13.9584C12.3391 13.9584 11.8268 13.9495 11.3053 13.9673C11.0766 13.9762 10.976 13.9138 10.9851 13.673C11.0034 13.1735 11.0034 12.665 10.9851 12.1566C10.9668 11.8622 11.0949 11.8087 11.3602 11.8176C11.8634 11.8355 12.3665 11.8176 12.8697 11.8266C13.0344 11.8266 13.1624 11.8176 13.1807 11.6036C13.2356 10.9792 13.5375 10.444 13.8852 9.93554C14.059 9.68579 14.0498 9.49847 13.812 9.27547C13.4735 8.96328 13.1716 8.60648 12.8331 8.28537C12.6501 8.11589 12.6867 7.99101 12.8422 7.83937C13.2356 7.46474 13.629 7.09902 14.0132 6.71547C14.1596 6.57275 14.2511 6.59951 14.3883 6.73331C14.7908 7.13471 15.2117 7.52718 15.6142 7.92857C15.7606 8.07129 15.8886 8.14265 16.0899 8.01777C16.7211 7.6253 17.4073 7.34878 18.1574 7.25958C18.3587 7.23282 18.3861 7.10794 18.3861 6.93847C18.377 6.59059 18.377 6.26056 18.377 5.86808ZM19.1729 16.3489C20.8745 16.3489 22.4572 14.8236 22.4663 13.1735C22.4755 11.5054 20.8837 9.93554 19.1729 9.94447C17.4347 9.94447 15.9069 11.4519 15.8978 13.1735C15.8886 14.8415 17.4439 16.34 19.1729 16.3489Z"
                  fill="#A0CFF9"/>
            <path
              d="M19.173 16.3517C17.4439 16.3517 15.8887 14.8443 15.907 13.1763C15.9162 11.4547 17.444 9.94727 19.1821 9.94727C20.8929 9.94727 22.4847 11.5082 22.4756 13.1763C22.4573 14.8264 20.8746 16.3517 19.173 16.3517ZM19.2004 14.9246C20.2708 14.9156 20.9844 14.1931 20.9935 13.1584C21.0118 12.097 20.0604 11.3566 19.1638 11.3655C18.0569 11.3744 17.3342 12.0791 17.3525 13.1941C17.3708 14.2734 18.066 14.9335 19.2004 14.9246Z"
              fill="#276899"/>
          </svg>
          <span class="batch-actions-counter" v-if="clickedNumbers.length"
                :class="{'batch-actions-max-counter': clickedNumbers.length === 12}">{{
              clickedNumbers.length
            }}</span>
        </div>
        <ul class="sort-tabs">
          <li>Filter by:</li>
          <li class="filter-icon" v-if="getClientWidth <= 1408"><img src="@/assets/img/icons/filter-icon.svg" @mouseover="showFilters = !showFilters"/></li>
          <li class="filter-item" v-if="showFilters" :class="{'filter-item-absolute': getClientWidth <= 1408}">
            <ul class="filter-list">
              <li><label class="options-label" :ref="'showCountry'" @click="indexRef = 'showCountry'">
                <input class="input-field num" type="text" readonly placeholder="Country"
                       :value="getElementSearch('showCountry', 'countrySearch', 'country', 'getCountries', `countries (${this.filter.country.length})`)">
                <span @click="setRefers('showCountry')" class="triangle"
                      :class="{'rotate-arrow': showRefers === 'showCountry'}">
              <img src="@/assets/img/icons/select-arrow.svg" alt="select">
            </span>
                <DropdownList v-show="showRefers === 'showCountry'" :classNameList="'list-related-numbers'"
                              :dataList="getCountries.filter(c => c.country.toLowerCase().indexOf(this.countrySearch.toLowerCase()) !== -1)"
                              @clickFunc="(item) => {setFilterCountry('country', item, 'array', getCountries); changeCountry(item)}"
                              :itemText="(item) => item.country"
                              :classNameItemComputed="classNameItemComputed"
                              :classNameInput="'list-related-input'"
                              @clickFuncAll="setFilterCountry('country', false, getCountries); changeCountry()"
                              :valueInput="countrySearch" :contentTippyCondition="(item) => item.country.length > 13"
                              @changeInput="(event) => countrySearch = event.target.value"
                              :showItem="(item) => getCountries.filter(c => c.country.toLowerCase().indexOf(this.countrySearch.toLowerCase()) !== -1)"/>
              </label></li>
              <li class="numer-filter-item">
                <div class="number-type-block">
                  <label class="options-label" :ref="'showCountry'" @click="indexRef = 'showCountry'">
                    <input class="input-field num" type="text" readonly placeholder="Enter Country"
                           value="Begin">
                    <span @click="setRefers('showTypeOfNumbers')" class="triangle"
                          :class="{'rotate-arrow': showRefers === 'showTypeOfNumbers'}">
                <img src="@/assets/img/icons/select-arrow.svg" alt="select">
                </span>
                    <ul v-if="showRefers === 'showTypeOfNumbers'" class="list-related-numbers">
                      <li class="choosed" @click="showRefers = ''">Begin</li>
                    </ul>
                  </label>
                </div>
                <label>
                  <input @input="searchNumbers()" v-model="filter.number" class="input-field" type="number"
                         placeholder="V-number">
                </label>
              </li>
              <li>
                <label>
                  <input @input="searchNumbers()" v-model="filter.name" class="input-field description-input"
                         type="text"
                         placeholder="Description">
                </label>
              </li>
            </ul>
          </li>

        </ul>
      </div>

      <span :class="{'display-paginator': getClientWidth <= 1408 && showFilters}">
        <Paginator v-if="getPaginatorNumbers.paginator.recordsPerPage" :paginator="getPaginatorNumbers.paginator" perPage="8"
                 :methods="{page: 'setNumPage',peerPage: 'setNumPerPage'}" />
      </span>
      
    </div>

    <div class="data-container">
      <div v-if="numbers.length">
        <span :ref="`batchActions`" @click="indexRef = `batchActions`">
          <batch-actions v-if="clickedNumbers.length >= 2 && showBatchActions" :batchType="'number'"
                         :arrayOfUsers="clickedNumbers"
                         :dataView="{togglesField: false, textField: {field: 'description', textTitle: 'Update description', placeholder: 'Enter description'}, listField: false, selectedText: 'numbers'}"
                         @updateUsers="arrayActions"/>
        </span>

        <table class="user-table">
          <thead class="table-header">
          <tr>
            <th colspan="2" @click="sort('country')" :class="{active: sortBy === 'country'}">
              <div class="clicked-head-block-for-barch-actions" content="Mark all"
                   v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }">
                <div @click.stop="markAll()" class="clicked-head"></div>
              </div>
              Country <img src="@/assets/img/icons/sort-arrow.svg" ref="country" alt=""></th>
            <th @click="sort('network')" :class="{active: sortBy === 'network'}">
              Network <img src="@/assets/img/icons/sort-arrow.svg" ref="network" alt=""></th>
            <th @click="sort('number')" :class="{active: sortBy === 'number'}">
              V-Number <img src="@/assets/img/icons/sort-arrow.svg" ref="number" alt=""></th>
            <th @click="sort('description')" :class="{active: sortBy === 'name'}">
              Description <img src="@/assets/img/icons/sort-arrow.svg" ref="description" alt=""></th>
            <th>
              Department
            </th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr class="not-hover" v-for="number in numbers" :key="number.internalNumber">
            <td :class="{'marked-for-barch-actions': clickedNumbers.filter(item => item.uid === number.uid).length}"
                class="ava-wrap">
              <div class="clicked-hover-for-barch-actions" @click="indexRef = `batchActions`" content="Mark"
                   v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }">
                <div @click.stop="mark(number, clickedNumbers)" class="clicked"></div>
              </div>
            </td>
            <td class="item-country ellipsis">{{ number.country }}</td>
            <td class="center">{{ number.network }}</td>

            <td style="user-select: text">{{ number.number }}</td>
            <td class="description">
              <input placeholder="Enter description"
                     class="input-field" type="text"
                     @input="setDescription(number)"
                     v-model="number.description">
            </td>
            <td>{{ firstDepartmentsName[number.uid] || '' }} ({{ number.usedIn.department.length }})
              <div :ref="`filterUsersName`" @click="indexRef = `filterUsersName`; setRefers(number.uid)"
                   class="question">
                <img width="16" src="../../../assets/img/icons/question-mark.svg" alt="q">
                <div v-show="showRefers === number.uid" class="refers-wrap">
                  <span>This number refers to Departments:</span>
                  <ul>
                    <li @click="toDepartment(department)" v-for="department of number.usedIn.department"
                        :key="department.uid.slice(1, 15)" class="ellipsis">
                      {{ department.name }}
                    </li>
                  </ul>
                </div>
              </div>
            </td>
            <td :style="{width: getClientWidth <= 1408 ? '60px' : '180px'}"></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { DepartmentGettersApi } from '@/API/getters'
import { NumberEffectsApi } from '@/API/effects'
import ClickOutside from 'vue-click-outside'
import { mapGetters } from 'vuex'
import _ from 'lodash'
import markObj from '@/lib/markToItemsToBatchActions.js'
import Paginator from '@/components/Paginator'
import DropdownList from '@/components/DropdownList'
import observables from '@/store/observable.mutations'
import ControlPanel from '../../../components/ControlPanel'
import BatchActions from '@/components/BatchAction/BatchActions'
import { serverSort } from '@/lib/sort.js'
import { clickCheck } from '@/lib/clickCheck.js'

export default {
  name: 'Numbers',
  components: {ControlPanel, Paginator, BatchActions, DropdownList},
  data() {
    return {
      timer: 0,
      firstDepartmentsName: {},
      sortBy: 'country',
      numbers: [],
      departments: [],
      filter: {
        name: '',
        number: '',
        country: []
      },
      topList: [],
      bottomList: [],
      getCountries: [],
      countrySearch: '',
      clickedNumbers: [],
      showRefers: '',
      numbersForWrite: [],
      showApplyBtn: false,
      order: {
        country: 'desc',
        network: 'desc',
        vnumber: 'desc',
        description: 'desc'
      },
      showBatchActions: false,
      countryValid: true,
      indexRef: '',
      showFilters: true,
      getClientWidth: document.documentElement.clientWidth,
      confirmationConfig: {
        cancel: () => this.$store.commit('confirmationMutation', null),
        cancelBtnText: 'Close',
        titleText: 'Confirmation',
        textConfirmation: 'Successfully updated'
      }
    }
  },
  watch: {
    getCountry() {
      this.getCountries = this.bottomList = this.getCountry
    },
    getGlobalExternalNumbers() {
      this.numbers = JSON.parse(JSON.stringify(this.getGlobalExternalNumbers))
      this.$store.dispatch('setInitialAvaibleNumbers', JSON.parse(JSON.stringify(this.getGlobalExternalNumbers)))
      this.numbers.forEach(n => {
        if (n.usedIn.department.length) {
          this.firstDepartmentsName[n.uid] = n.usedIn.department.length > 1
            ? n.usedIn.department[0].name + '...'
            : n.usedIn.department[0].name
        }
      })
    }
  },
  computed: {
    ...mapGetters(['getInitialAvaibleNumbers', 'getPaginatorNumbers', 'getCountry', 'getGlobalExternalNumbers']),
  },
  methods: {
    classNameItemComputed(item) {
      return this.filter.country.some(u => item.uid === u.uid)  ? 'selected' : ''
    },
    hideListOptions() {
      clickCheck(this, this.indexRef, this.$refs)
    },
    hide() {
      this.showRefers = ''
      this.showBatchActions = false
    },
    setDescription(number) {
      const index = this.numbersForWrite.findIndex(num => num.uid === number.uid)
      if (index !== -1) {
        this.numbersForWrite[index] = number
      } else {
        this.numbersForWrite.push(number)
      }
      for (let i = 0; i < this.getInitialAvaibleNumbers.length; i++) {
        if (!_.isEqual(this.getInitialAvaibleNumbers[i], this.numbers[i])) {
          this.showApplyBtn = true
          break
        } else {
          this.showApplyBtn = false
        }
      }
    },
    arrayActions(array) {
      this.numbersForWrite = array
      this.applyChanges()
      this.showBatchActions = false
    },
    changeCountry(item) {
      if (item) {
        const includes = this.topList.filter(c => c.country === item.country)
        if (includes.length) {
          this.topList = this.topList.filter(c => c.country !== item.country)
          this.bottomList.push(item)
        } else {
          this.bottomList = this.bottomList.filter(c => c.country !== item.country)
          this.topList.push(item)
        }
        this.topList = _.sortBy(this.topList, ['country'])
        this.bottomList = _.sortBy(this.bottomList, ['country'])
        this.getCountries = _.concat(this.topList, this.bottomList)
      } else {
        this.getCountries = _.concat(JSON.parse(JSON.stringify(this.topList)), JSON.parse(JSON.stringify(this.bottomList)))
        this.topList = []
        this.bottomList = this.getCountries
      }
    },
    getElementSearch(showListParam, searchParam, itemParam, initialArrayParam, selectedValuesReturn) {
      if (this.showList === showListParam) {
        return this[searchParam]
      } else if (!this.filter[itemParam].length || this.filter[itemParam].length === this[initialArrayParam].length) {
        return ``
      } else {
        return selectedValuesReturn
      }
    },
    setFilterCountry(name, value, vuex) {
      if (!value) {
        this.filter[name].length === vuex.length
          ? this.filter[name] = []
          : this.filter[name] = vuex
      } else {
        this.filter[name].length === new Set([...this.filter[name], value]).size
          ? this.filter[name] = this.filter[name].filter(v => {
            if (v.uid) {
              return v.uid !== value.uid
            } else {
              return v.id !== value.id
            }
          })
          : this.filter[name].push(value)
      }
    },
    applyChanges() {
      let bool = true
      const func = number => NumberEffectsApi.updateNumber(number.uid, {'description': number.description})
      Promise.all(this.numbersForWrite.map(func))
        .then(() => {
          bool ? this.$store.commit('confirmationMutation', this.confirmationConfig) : null
          this.numbersForWrite = []
        })
        .catch(() => bool = false)
        .finally(() => this.fetch(this.getPaginatorNumbers.peerPage, this.sortBy))
      this.showApplyBtn = false
    },
    clearChanges() {
      this.fetch(this.getPaginatorNumbers.peerPage, this.sortBy)
      this.numbersForWrite = []
      this.showApplyBtn = false
    },
    setRefers(id) {
      if (this.showRefers === id) {
        this.showRefers = ''
      } else {
        this.showRefers = id
      }
    },
    mark(number, numbers) {
      this.clickedNumbers = markObj.mark(number, numbers)
    },
    markAll() {
      this.clickedNumbers = markObj.markAll(this.numbers, this.clickedNumbers)
    },
    searchNumbers() {
      this.countryValid = /^[^!@#$%^&*_0123456789]{0,}$/.test(this.filter.country)
      clearTimeout(this.timer)
      this.timer = setTimeout(() => this.countryValid ? this.fetch(this.getPaginatorNumbers.peerPage, this.sortBy, this.getPaginatorNumbers.page, '', this.filter.country, this.filter.number, this.filter.name) : null, 800)
    },
    sort(string) {
      this.sortBy = string
      const dataSort = serverSort(this.fetch, this.$refs[string], this.order[string], this.getPaginatorNumbers.peerPage, string, this.getPaginatorNumbers.page)
      this.order[string] = dataSort.order
      this.$refs[string] = dataSort.refArrow
    },
    fetch(peerPage, sort, page, order, country, number, description) {
      this.$store.dispatch('setGlobalExternalNumbers', {peerPage, sort, page, order, country, number, description})
      // NumbersGettersApi.getNumbers(peerPage, sortBy, page, country, number, name, order)
      //   .then(response => {
      //     this.numbers = response.data
      //     this.$store.dispatch('getNumPaginator', response.paginator)
      //     response.data.forEach(n => {
      //       if (n.usedIn.department.length) {
      //         this.firstDepartmentsName[n.uid] = n.usedIn.department.length > 1
      //           ? n.usedIn.department[0].name + '...'
      //           : n.usedIn.department[0].name
      //       }
      //     })
      //   })
    },
    toDepartment(department) {
      DepartmentGettersApi.viewDepartment(department.uid)
      localStorage.setItem('depUid', department.uid)
      this.$router.push({
        path: `/config/departments/department-setting/${department.name}`,
        query: {exact: 'numbers'}
      })
    },
    windowResizeHandler() {
      this.getClientWidth = document.documentElement.clientWidth
      this.getClientWidth > 1408 ? this.showFilters = true : this.showFilters = false
    }
  },
  created() {
    this.fetch(8, this.sortBy)
  },
  mounted() {
    window.addEventListener('resize', this.windowResizeHandler)
    this.getCountries = this.bottomList = this.getCountry
    this.popupItem = this.$el
    this.$store.subscribe((mutation) => {
      if (observables.paginator.numbers.includes(mutation.type)) {
        this.fetch(this.getPaginatorNumbers.peerPage, this.sortBy, this.getPaginatorNumbers.page, 'desc')
      }
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.windowResizeHandler)
  },
  directives: {
    ClickOutside
  }
}
</script>

<style scoped lang="scss">
.get-users-page-container {
  z-index: 10000;
  // width: 1479.41px;
  width: 100%;
}

.nav-local {
  margin-left: 24px;
  position: relative;

  &-item {
    height: 30px;
    padding: 7px 15px 2px;
    color: #4B535A;
    text-decoration: none;
    font-size: 14px;
  }

  .router-link-active {
    background-color: var(--light-blue);
    color: var(--white);
    border-radius: 4px;
  }

  .btn-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    margin-right: 25px;
    white-space: nowrap;
    position: absolute;
    top: -8px;
    right: 0;
  }
}

.hr {
  height: 2px;
  width: 100%;
  border-radius: 8px;
  background-color: var(--cdr-border-row);
}

.display-paginator {
  display: none;
}

.data-container {
  background: var(--dark-shock);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.12);
  border-radius: 4px 4px 0 0;
  position: relative;

  .departments {
    position: fixed;
    top: 14px;
    left: -1px;
    width: 205px;
    height: 197px;
    background: #121A22;
    border: 1px solid #4D515C;
    box-shadow: 0 4px 14px rgba(0, 0, 79, 0.05);
    border-radius: 8px;
    padding: 7px;
    z-index: 10;

    label {
      position: relative;

      &:after {
        content: '';
        width: 100%;
        height: 1px;
        background-color: #4D515C;
        position: absolute;
        bottom: -4px;
        left: 0;
      }

      input {
        width: 100%;
        height: 18px;
        margin: 0;
        background-image: url("../../../assets/img/icons/search-blue.svg");
        background-size: 12px;
        background-position: 95% 50%;
        background-repeat: no-repeat;

        &::placeholder {
          font-size: 12px;
          font-weight: 300;
          line-height: 14px;

        }
      }
    }

    .selected {
      height: 29px;
      white-space: nowrap;
      position: absolute;
      bottom: 0;
      left: 0;
      border-radius: 0 0 8px 8px;
      font-size: 12px;
      font-weight: 300;
      line-height: 14px;
      background-color: #17212B;
      width: 100%;
      display: flex;
      align-items: center;
      padding-left: 7px;
    }

    .btn-container {
      margin-left: 9px;
    }
  }
}

.data-container p {
  padding: 24px;
}

.user-table {
  text-align: center;
}

table {
  width: 100%;
  position: relative;
  border-collapse: collapse;

  .active {
    text-decoration: underline;
  }

  thead {
    tr {
      height: 44px;
      background: var(--light-blue);

      .head {
        display: block;
        width: 100%;
      }

      th {
        font-size: 14px;
        border: 0;
        color: #F1F8FF;
        vertical-align: bottom;
        text-align: left;
        padding: 0 5px 14px 5px;
        cursor: pointer;
        white-space: nowrap;
        position: relative;

        &:nth-child(1), &:nth-child(2) {
          padding-left: 35px;
          text-align: left;
        }
      }

      h3 {
        font-size: 24px;
        font-weight: 300;
        color: var(--white);
        padding-top: 24px;
        padding-left: 24px;
      }
    }
  }

  tbody {
    position: relative;

    .not-hover:hover {
      // background-color: transparent;
      background-color: var(--available-numbers-hover);
    }

    &:before {
      position: absolute;
      background-color: var(--main-bg);
      width: calc(100% + 2px);
      height: 15px;
      display: table-row;
      content: '';
      border-bottom: 2px solid var(--cdr-border-row);
      border-right: 2px solid var(--main-bg);
      border-left: 2px solid var(--main-bg);
    }

    td {
      position: relative;
      color: var(--font-panel);

      &.item-country {
        max-width: 150px;
      }

      &:nth-child(1) {
        margin-left: 35px;
        margin-right: 5px;
        position: relative;

        &:after {
          position: absolute;
          left: 24px;
          width: calc(100% - 24px);
        }

      }

      &:nth-child(9) {
        &:after {
          right: 24px;
          width: calc(100% - 24px);
        }
      }
    }

    .actions {
      height: 52px;
      width: 260px;
      position: relative;
      bottom: 0;
      padding: 12px 0 10px 0 !important;

      label {
        display: block;
        width: 100%;
        text-align: left;
        white-space: nowrap;

        &:not(:last-child) {
          margin-bottom: 4px;
        }
      }

    }
  }

  tbody tr:nth-child(1) {
    height: 67px;
  }

  tr {
    max-height: 52px;
    height: 52px;
    background-color: var(--users-table-bg);
    border: 2px solid var(--cdr-border-row);
    border-top: none;

    td {
      .question {
        display: inline;
        position: relative;

        img {
          margin-bottom: -2px;
        }

        .refers-wrap {
          position: absolute;
          left: calc(100% + 10px);
          top: -40px;
          display: block;
          width: 168px;
          height: 188px;
          background-color: var(--main-bg);
          border-radius: 8px;
          padding: 12px;
          z-index: 15;
          color: var(--font-panel);
          box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);

          span {
            display: block;
            height: 40px;
            font-size: 15px;
            font-weight: 400;
            line-height: 20px;
            padding-bottom: 5px;
            border-bottom: 1px solid var(--bottom-line);
            margin-bottom: 5px;
          }

          ul {
            font-size: 16px;
            font-weight: 400;
            line-height: 19px;
            color: var(--light-blue);
            max-height: 130px;
            overflow: auto;
            z-index: 15;

            li {
              cursor: pointer;
              text-decoration: underline;
              margin-bottom: 10px;

              &:hover {
                color: var(--font-panel);
                text-decoration-color: var(--font-panel);
              }
            }
          }
        }
      }

      &.description {
        width: 33%;

        .input-field {
          width: 365px;
        }
      }
    }

    &:nth-child(1) {
      padding-top: 15px;

      td {
        padding-top: 15px;

      }

      .clicked-hover-for-barch-actions {
        &:hover {
          .clicked {
            top: 41% !important;
          }
        }
      }

      .actions {
        padding: 25px 0 10px 0 !important;
      }
    }

    .ava-wrap {
      position: relative;

      &.marked-for-barch-actions {
        &:before {
          width: 5px;
          height: 40px;
        }
      }

      .clicked-hover-for-barch-actions {
        width: 30px;
        height: 52px;
        bottom: 11px;

        &:hover {
          .clicked {
            top: 50%;
            width: 20px;
            height: 40px;
          }
        }
      }

      .ava {
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 24px;
      }
    }


    .center {
      text-align: center;
    }

    td {
      height: 52px;
      text-align: left;
      padding: 5px 10px;

      input {
        background-color: var(--cdr-item-bg);
        margin: 15px 0;

        &::placeholder {
          font-size: 12px;
          font-weight: 300;
        }
      }

      &:nth-child(2) {
        padding-left: 0;
        white-space: nowrap;
      }

      * {
        font-size: 14px;
      }
    }

    &:first-child {
      .ava-wrap {
        &.marked-for-barch-actions {
          &:before {
            top: 59%;
          }
        }

        .clicked-hover-for-barch-actions {
          bottom: 4px;
        }
      }
    }
  }
}

.user-table button {
  background: transparent;
  color: #6d6d6d;
  text-transform: uppercase;
  border: 1px solid #6d6d6d;
  border-radius: 2px;
  font-size: 14px;
  line-height: 16px;
}

.toolbar {
  margin: 12px 0;
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: var(--toolbar-bg);
  padding-left: 5px;
  border-radius: 8px;
  height: 48px;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .btn-img {
    cursor: pointer;

    path {
      fill: #646D75;
    }

    &.batch path {
      fill: var(--light-blue);

      &.batch {
        fill: #A0CFF9;
      }
    }
  }

  .sort-tabs {
    position: relative;

    .filter-icon {
      img {
        cursor: pointer;
      }
    }

    .filter-item {
      position: relative;

      &.filter-item-absolute {
        position: absolute;
        left: 150px;
        z-index: 10;
        background-color: var(--toolbar-bg);
      }

      .filter-list {
        display: flex;
      }
    }

    li {
      margin-right: 0;
      position: relative;
      display: flex;
      align-items: center;

      &.numer-filter-item {
        background: var(--scenario-vnumber-input-bg);
        margin: 5px 16px;
        padding: 0;
        position: relative;
        border-radius: 4px;

        input {
          margin: 0;
          box-shadow: none;
        }

        &::after {
          content: '';
          position: absolute;
          width: 1px;
          height: 20px;
          display: block;
          background: var(--line-between-type-and-value);
          left: 95px;
        }
      }

      .input-field {
        height: 24px;
        padding-right: 10px;
        background: var(--scenario-vnumber-input-bg);

        &:focus {
          padding-right: 18px;
        }
      }

      .number-type-block {
        position: relative;
        margin-right: 3px;
        width: 95px;

        .options-label {
          width: 95px;

          .triangle {
            bottom: 0;
            left: 0;
            width: 88px;
            height: 24px;
          }

          .input-field {
            width: 95px;
            font-size: 16px;
            line-height: 14px;
          }

          .list-related-numbers {
            width: 95px;
          }
        }
      }

      .options-label {
        .triangle {
          width: calc(100% - 39px);
          left: 16px;
          height: 24px;
          bottom: 5px;
        }

        ::v-deep .list-related-numbers {
          width: calc(100% - 32px);
          overflow-y: auto;
          max-height: 150px;

          li {
            border-radius: 0;
            margin-right: 0;

            .list-related-input {
              display: block;
              padding: 5px 16px;
              background: var(--input-bg);
              box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
              border-radius: 4px;
              color: var(--font-panel);
              border: none;
              width: 100%;
              height: 18px;
              margin: 0;
              background-image: url('../../../assets/img/icons/search-blue.svg');
              background-size: 12px;
              background-position: 95% 50%;
              background-repeat: no-repeat;
            }
          }
        }
      }
    }

    input {
      width: 120px;
    }

    .description-input {
      width: 170px;
    }
  }
}

@media (max-width: 1600px) {
  table {
    tr {
      td.description {
        .input-field {
          width: 320px;
        }
      }
    }
  }
}

@media (max-width: 1408px) {
    table {
    tr {
      td.description {
        .input-field {
          width: 250px;
        }
      }
    }
  }
}
</style>
