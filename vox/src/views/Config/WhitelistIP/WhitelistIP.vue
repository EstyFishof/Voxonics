<template>
  <div class="white-list-container">
    <div class="toolbar">
      <div>
        <div>
          <svg content="Batch action" v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }"
               class="btn-img" width="41" height="42" viewBox="0 0 41 42"
               fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <path class="batch"
                  d="M15.1934 5.46003C15.166 5.43327 15.1385 5.41543 15.1202 5.38867C15.1385 5.41543 15.166 5.43327 15.1934 5.46003Z"
                  fill="#A0CFF9"/>
            <path class="batch"
                  d="M18.377 5.86808C18.4227 5.52913 18.1849 4.98502 18.4776 4.7531C18.7246 4.55686 19.2644 4.68174 19.6669 4.68174C20.5635 4.68174 20.5635 4.68174 20.5635 5.56481C20.5635 6.0108 20.5726 6.45679 20.5635 6.90279C20.5635 7.09011 20.6001 7.2239 20.8196 7.24174C21.4874 7.30418 22.0638 7.60746 22.6127 7.95533C22.8689 8.11589 23.0335 8.09805 23.2256 7.86613C23.5184 7.50934 23.866 7.19714 24.1771 6.84927C24.36 6.64411 24.4973 6.58167 24.7168 6.82251C25.0096 7.14363 25.3298 7.4469 25.65 7.74126C25.8695 7.93749 25.9244 8.07129 25.65 8.29429C25.2657 8.59756 24.9364 8.9722 24.5613 9.30223C24.36 9.48063 24.3234 9.62335 24.479 9.86419C24.8449 10.3905 25.1834 10.9435 25.2383 11.6036C25.2657 11.8444 25.4304 11.8266 25.6042 11.8266C26.2263 11.8266 26.8484 11.8355 27.4705 11.8176C27.7083 11.8087 27.7907 11.8801 27.7815 12.1209C27.7632 12.6561 27.7632 13.1913 27.7815 13.7265C27.7907 13.9852 27.69 14.0565 27.443 14.0476C26.8027 14.0298 26.1623 14.0565 25.531 14.0387C25.284 14.0298 25.1742 14.11 25.1377 14.3509C25.0279 15.0466 24.7992 15.7067 24.4058 16.2954C24.2777 16.4827 24.3051 16.6344 24.479 16.8038C24.8815 17.2052 25.2474 17.6423 25.6591 18.0437C25.8695 18.2489 25.8146 18.3827 25.6317 18.5521C25.2932 18.8733 24.9547 19.1944 24.6345 19.5244C24.4424 19.7206 24.3051 19.7296 24.113 19.5155C23.7654 19.1409 23.3903 18.793 23.0427 18.4183C22.878 18.2399 22.7499 18.1953 22.5395 18.3291C21.9449 18.6949 21.3411 19.0249 20.6275 19.1052C20.3805 19.1319 20.4079 19.3103 20.4079 19.4709C20.4079 19.9347 20.3988 20.3896 20.4079 20.8535C20.4171 21.0765 20.3348 21.1746 20.0969 21.1657C19.5937 21.1478 19.0906 21.1567 18.5874 21.1657C18.313 21.1746 18.2032 21.0765 18.2123 20.8089C18.2306 20.3629 18.194 19.9169 18.2215 19.4709C18.2398 19.1944 18.13 19.0963 17.8738 19.0695C17.1786 18.9892 16.5565 18.7127 15.9801 18.3559C15.7972 18.2399 15.6599 18.2489 15.5044 18.3916C15.111 18.7573 14.6902 19.1052 14.2968 19.4798C14.0864 19.676 13.94 19.676 13.7388 19.462C13.4094 19.0963 13.0526 18.7484 12.6867 18.4094C12.4854 18.2221 12.4946 18.0883 12.6959 17.901C13.0984 17.5174 13.4735 17.116 13.8668 16.7236C14.0041 16.5808 14.0864 16.447 13.9583 16.2508C13.5467 15.6175 13.2905 14.9218 13.1807 14.1814C13.1533 13.9762 13.0252 13.9584 12.8605 13.9584C12.3391 13.9584 11.8268 13.9495 11.3053 13.9673C11.0766 13.9762 10.976 13.9138 10.9851 13.673C11.0034 13.1735 11.0034 12.665 10.9851 12.1566C10.9668 11.8622 11.0949 11.8087 11.3602 11.8176C11.8634 11.8355 12.3665 11.8176 12.8697 11.8266C13.0344 11.8266 13.1624 11.8176 13.1807 11.6036C13.2356 10.9792 13.5375 10.444 13.8852 9.93554C14.059 9.68579 14.0498 9.49847 13.812 9.27547C13.4735 8.96328 13.1716 8.60648 12.8331 8.28537C12.6501 8.11589 12.6867 7.99101 12.8422 7.83937C13.2356 7.46474 13.629 7.09902 14.0132 6.71547C14.1596 6.57275 14.2511 6.59951 14.3883 6.73331C14.7908 7.13471 15.2117 7.52718 15.6142 7.92857C15.7606 8.07129 15.8886 8.14265 16.0899 8.01777C16.7211 7.6253 17.4073 7.34878 18.1574 7.25958C18.3587 7.23282 18.3861 7.10794 18.3861 6.93847C18.377 6.59059 18.377 6.26056 18.377 5.86808ZM19.1729 16.3489C20.8745 16.3489 22.4572 14.8236 22.4663 13.1735C22.4755 11.5054 20.8837 9.93554 19.1729 9.94447C17.4347 9.94447 15.9069 11.4519 15.8978 13.1735C15.8886 14.8415 17.4439 16.34 19.1729 16.3489Z"
                  fill="#A0CFF9"/>
            <path
              d="M19.173 16.3517C17.4439 16.3517 15.8887 14.8443 15.907 13.1763C15.9162 11.4547 17.444 9.94727 19.1821 9.94727C20.8929 9.94727 22.4847 11.5082 22.4756 13.1763C22.4573 14.8264 20.8746 16.3517 19.173 16.3517ZM19.2004 14.9246C20.2708 14.9156 20.9844 14.1931 20.9935 13.1584C21.0118 12.097 20.0604 11.3566 19.1638 11.3655C18.0569 11.3744 17.3342 12.0791 17.3525 13.1941C17.3708 14.2734 18.066 14.9335 19.2004 14.9246Z"
              fill="#276899"/>
          </svg>
        </div>
        <div class="btn-img" content="Add new user"
             v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }"
             @click="toggleCreateIPLine()">
            <span content="Add new department" class="add-btn-dep">
              <img width="14" src="@/assets/img/icons/plus.svg" alt="plus" class="add-btn-plus"/>
              <img width="24" height="26" src="@/assets/img/icons/whitelistIP.svg" alt="plus"
                   class="add-btn-plus department-icon"/>
            </span>
        </div>
        <ul class="sort-tabs">
          <li>Filter by:</li>
          <li v-click-outside="hide" ref="hideList">
            <label class="options-label">
              <input class="input-field num" type="text" :value="getChainFilterTitle" readonly>
              <span @click="sortByShow = !sortByShow" class="triangle" :class="{'rotate-arrow': sortByShow}">
                <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.9" d="M1 1L6 6L11 1" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              <DropdownList v-show="sortByShow" :classNameList="'list-related-numbers'" :dataList="chainsCollection"
                @clickFunc="(element) => setParam(element.data, 'type')" :itemText="(element) => element.title.toUpperCase()"
                :classNameItemComputed="element => paramFilter.type === element ? 'active' : ''" />
            </label>
          </li>
          <li><label>
            <input v-model="paramFilter.ip" class="input-field" type="text"
                   placeholder="IP">
          </label></li>
          <li><label>
            <input v-model="paramFilter.description" class="input-field" type="text"
                   placeholder="Description">
          </label></li>
        </ul>
      </div>
      <Paginator v-if="getPaginatorWhitelistIP.paginator.recordsPerPage" :paginator="getPaginatorWhitelistIP.paginator" perPage="100"
                 :methods="{page: 'setWhitelistIPPage', peerPage: 'setWhitelistIPPerPage'}"/>
      <div class="right-tabs">
        <ControlPanel :show="showApplyBtn" :apply="setApply" :discard="clearQueue"/>
      </div>
    </div>
    <div class="wrap-table">
      <table>
        <thead>
        <tr class="header">
          <th class="address" @click="filterData('ip')">
            IP Address
            <img ref="ip" src="@/assets/img/icons/sort-arrow.svg"/>
          </th>
          <th class="chain" @click="filterData('chain')">
            Chain
            <img ref="chain" src="@/assets/img/icons/sort-arrow.svg"/>
          </th>
          <th class="description" @click="filterData('description')">
            Description
            <img ref="description" src="@/assets/img/icons/sort-arrow.svg"/>
          </th>
          <th class="updated" @click="filterData('dateUpdated')">
            Updated
            <img ref="updated" src="@/assets/img/icons/sort-arrow.svg"/>
          </th>
          <th class="actions">
            Actions
            <img src="@/assets/img/icons/sort-arrow.svg"/>
          </th>
        </tr>
        </thead>
        <tbody ref="tbody" v-show="getListFirewall.length">
        <tr v-show="addMode">
          <td>
            <button class="btn-edit" @click="toggleCreateIPLine()">
              <img class="edit" src="@/assets/img/icons/edit.svg" alt="">
              <img class="del" src="@/assets/img/icons/cross-delete.svg" alt="">
            </button>
            <div class="create-address">
              <!-- <vue-ip-input :ip="newIP.ip" ref="new-vue-ip" :on-change="verification"></vue-ip-input> -->
              <vue-ip :ip="newIP.ip" ref="new-vue-ip" :on-change="verification" :placeholder="true" theme="material"></vue-ip>
              <span v-if="errorIPText.length" class="error">{{ errorIPText }}</span>
            </div>
          </td>
          <td class="create-chain-td">
            <div class="chain-btns create-chain-btn">
              <span class="chain-btn"
                    :style="{background: newIP.chain.indexOf('web_user') !== -1 ? '#276899' : 'var(--not-active-btn-ip)'}"
                    @click="setNewIpParam('chain', 'web_user')">WEB</span>
              <span class="chain-btn"
                    :style="{background: newIP.chain.indexOf('voip_user') !== -1 ? '#276899' : 'var(--not-active-btn-ip)'}"
                    @click="setNewIpParam('chain', 'voip_user')">VOIP</span>
            </div>
          </td>
          <td>
            <input class="input-description" placeholder="Enter description" v-model="newIP.description"/>
          </td>
          <td class="date"></td>
          <td class="actions-btns">
            <img @click="createFirewallIP()" width="32"
                 :class="{'disabled-btn': errorIPText.length || !newIP.chain.length}" class="status-icon"
                 src="@/assets/img/icons/successShadow.svg"/>
          </td>
        </tr>

        <tr v-for="(item, index) in filtersParams" :key="index">
          <td>{{ item.ip }}</td>
          <td class="chain-td">
            <div class="chain-btns">
              <span class="chain-btn" @click="setOptions('web_user', 'chain', item)"
                    :style="{background: item.chain.indexOf('web_user') !== -1 ? '#276899' : 'var(--not-active-btn-ip)'}">WEB</span>
              <span class="chain-btn" @click="setOptions('voip_user', 'chain', item)"
                    :style="{background: item.chain.indexOf('voip_user') !== -1 ? '#276899' : 'var(--not-active-btn-ip)'}">VOIP</span>
            </div>
          </td>
          <td>
            <input class="input-description" :value="item.description"
                   @input="setOptions($event.target.value, 'description', item)" placeholder="Enter description"/>
          </td>
          <td class="date">{{ item.dateUpdated }}</td>
          <td class="actions-btns">
            <button @click.stop="beforeDelete(item)" class="btn-del">
              <img src="@/assets/img/icons/cross-delete.svg" width="12" height="12" alt="">
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>
<script>
import Paginator from '@/components/Paginator'
import FirewallEffectsApi from '../../../API/effects/Firewall.api'
import ControlPanel from '@/components/ControlPanel'
import ClickOutside from 'vue-click-outside'
import DropdownList from '@/components/DropdownList'
import VueIp from 'vue-ip'
import _ from 'lodash'
import { mapGetters } from 'vuex'

export default {
  name: 'WhitelistIP',
  components: {
    Paginator, 
    ControlPanel, 
    VueIp, 
    DropdownList
  },
  data() {
    return {
      addMode: false,
      sortByShow: false,
      sortBy: 'Type',
      newIP: {
        ip: '',
        chain: [],
        description: '',
      },
      chainsCollection: [
        {
          title: 'WEB',
          data: 'web_user'
        },
        {
          title: 'VOIP',
          data: 'voip_user'
        }
      ],
      arrayOfIPPart: new Map(),
      sortParams: {
        ip: 'desc',
        chain: 'desc',
        description: 'desc',
        dateUpdated: 'desc'
      },
      paramFilter: {
        type: '',
        ip: '',
        description: ''
      },
      firewallItem: {},
      showApplyBtn: false,
      arrayToUpdate: [],
      errorIPText: '',
      confirmationConfig: {
        execute: () => {this.deleteFirewallIP(this.firewallItem); this.$store.commit('confirmationMutation', null)},
        executeBtnText: 'Delete',
        cancel: () => this.$store.commit('confirmationMutation', null),
        cancelBtnText: 'Close',
        titleText: 'Confirmation',
        textConfirmation: 'Are you sure you want to delete this IP?'
      }
    }
  },
  watch: {
    getGlobalWhiteListIP() {
      this.$store.dispatch('setListFirewall', JSON.parse(JSON.stringify(this.getGlobalWhiteListIP)))
      this.$store.dispatch('setInitialListFirewall', JSON.parse(JSON.stringify(this.getGlobalWhiteListIP)))
      this.showApplyBtn = false
      this.arrayToUpdate = []
    }
  },
  computed: {
    ...mapGetters(['getPaginatorWhitelistIP', 'theme', 'getListFirewall', 'getInitialListFirewall', 'getGlobalWhiteListIP']),
    filtersParams() {
      let resultArray = []
      resultArray = this.getListFirewall.filter(ip => ip.ip.indexOf(this.paramFilter.ip) !== -1)
      resultArray = resultArray.filter(ip => ip.description.indexOf(this.paramFilter.description) !== -1)
      if(this.paramFilter.type !== '') {
        resultArray = resultArray.filter(ip => ip.chain.indexOf(this.paramFilter.type) !== -1)
      }
      return resultArray
    },
    getChainFilterTitle() {
      return this.chainsCollection.filter(el => el.data === this.paramFilter.type)[0]?.title || 'Chain'
    }
  },
  methods: {
    toggleCreateIPLine() {
      if(!this.addMode) return (() => {
        this.addMode = true
        this.addListenersForIPField()
      })()
      return (() => {
        this.removeListenersForIPField()
        this.addMode = false
        this.newIP = {
          ip: '',
          chain: [],
          description: '',
        }
        this.$refs['new-vue-ip'].clearAll()
        this.errorIPText = ''
      })()
    },
    beforeDelete(item) {
      this.firewallItem = item
      this.$store.commit('confirmationMutation', this.confirmationConfig)
    },
    verification(ip) {
      const reg = /^(?=\d+\.\d+\.\d+\.\d+$)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\.?){4}$/
      this.errorIPText = ''
      this.newIP.ip = this.addMode ? ip : ''
      this.getListFirewall.forEach(element => {
        if (element.ip === this.newIP.ip) {
          this.errorIPText = 'This IP is already in use'
        }
      })
      if(!this.errorIPText.length && ![...this.arrayOfIPPart.values()].includes(false) && [...this.arrayOfIPPart.values()].length) {
        reg.test(this.newIP.ip) ? null : this.errorIPText = 'Incorrectly entered data'
      }
      if(!this.addMode) return this.errorIPText = ''
    },
    addListenersForIPField() {
      this.$refs['new-vue-ip'].$el.querySelectorAll('div.segment input').forEach(item => {
        item.addEventListener('focus', () => this.focusIPFieldHandler(item))
        item.addEventListener('blur', () => this.blurIPFieldHandler(item))
      })
    },
    removeListenersForIPField() {
      this.$refs['new-vue-ip'].$el.querySelectorAll('div.segment input').forEach(item => {
        item.removeEventListener('focus', () => this.focusIPFieldHandler(item))
        item.removeEventListener('blur', () => this.blurIPFieldHandler(item))
      })
    },
    focusIPFieldHandler(item) {
      this.arrayOfIPPart.set(item, false)
    },
    blurIPFieldHandler(item) {
      this.arrayOfIPPart.set(item, true)
      this.verification(this.newIP.ip)
    },
    // listenerIP() {
      // this.$refs['new-vue-ip'].$el.querySelectorAll('div.segment input').forEach(item => {
      //   item.addEventListener('focus', () => {
      //     this.arrayOfIPPart.set(item, false)
      //   })
      //   item.addEventListener('blur', () => {
      //     this.arrayOfIPPart.set(item, true)
      //     this.verification(this.newIP.ip)
      //   })
      // })
    // },
    hide() {
      this.sortByShow = false
    },
    setNewIpParam(param, value) {
      if (param === 'chain') {
        if (this.newIP[param].indexOf(value) !== -1) {
          this.newIP[param] = this.newIP[param].filter(element => element !== value)
        } else {
          this.newIP[param].push(value)
        }
      } else {
        this.newIP[param] = value
      }
    },
    setParam(value, option) {
      if (this.paramFilter[option] === value) {
        this.paramFilter[option] = ''
      } else {
        this.paramFilter[option] = value
      }
    },
    filterData(param) {
      this.$store.dispatch('setSortListFirewall', {
        value: _.orderBy(this.getListFirewall, [param], [this.sortParams[param]]),
        identifier: 'list'
      })
      this.$store.dispatch('setSortListFirewall', {
        value: _.orderBy(this.getInitialListFirewall, [param], [this.sortParams[param]]),
        identifier: 'initialList'
      })
      if (this.sortParams[param] === 'desc') {
        this.sortParams[param] = 'asc'
        this.$refs[param] ? this.$refs[param].style.transform = 'rotate(180deg)' : null
      } else {
        this.sortParams[param] = 'desc'
        this.$refs[param] ? this.$refs[param].style.transform = '' : null
      }
    },
    setApply() {
      if (this.arrayToUpdate.length !== 0) {
        if (this.arrayToUpdate[0].chain.length === 2) {
          try {
            this.getInitialListFirewall.forEach(element => {
              if (element.uid.indexOf(this.arrayToUpdate[0].uid[0]) !== -1 && element.uid.length === 2) {
                const item = this.arrayToUpdate[0]
                FirewallEffectsApi.updateIP({...item, chain: item.chain[1], uid: item.uid[1]})
                  .then(() => {
                    FirewallEffectsApi.updateIP({...item, chain: item.chain[0], uid: item.uid[0]})
                      .then(() => {
                        this.arrayToUpdate.shift()
                        this.setApply()
                      })
                  })
                throw new Error()
              } else if (element.uid.indexOf(this.arrayToUpdate[0].uid[0]) !== -1 && element.uid.length < 2) {
                this.newIP.ip = this.arrayToUpdate[0].ip
                this.newIP.chain = [this.arrayToUpdate[0].chain[0] === 'voip_user' ? 'web_user' : 'voip_user']
                this.newIP.description = this.arrayToUpdate[0].description
                this.createFirewallIP()
                const item = this.arrayToUpdate[0]
                FirewallEffectsApi.updateIP({...item, chain: item.chain[0], uid: item.uid[0]})
                  .then(() => {
                    this.arrayToUpdate.shift()
                    this.setApply()
                  })
                throw new Error()
              }
            })
          } catch (error) {
            this.showApplyBtn = false
          }
        } else {
          if (this.arrayToUpdate[0].uid.length === 2) {
            this.deleteFirewallIP({
              ...this.arrayToUpdate[0],
              chain: this.arrayToUpdate[0].chain[0],
              uid: [this.arrayToUpdate[0].uid[1]]
            })
            FirewallEffectsApi.updateIP({
              ...this.arrayToUpdate[0],
              chain: this.arrayToUpdate[0].chain[0],
              uid: this.arrayToUpdate[0].uid[0]
            })
              .then(() => {
                this.arrayToUpdate.shift()
                this.setApply()
              })
          } else {
            FirewallEffectsApi.updateIP({
              ...this.arrayToUpdate[0],
              chain: this.arrayToUpdate[0].chain[0],
              uid: this.arrayToUpdate[0].uid[0]
            })
              .then(() => {
                this.arrayToUpdate.shift()
                this.setApply()
              })
          }
        }
      }
      this.showApplyBtn = false
    },
    clearQueue() {
      this.$store.dispatch('setGlobalWhiteListIP')
    },
    isEqual() {
      let bool = false
      this.arrayToUpdate = []
      for (let i = 0; i < this.getInitialListFirewall.length; i++) {
        if (!_.isEqual(this.getInitialListFirewall[i], this.getListFirewall[i]) && this.getListFirewall[i]) {
          this.showApplyBtn = true
          bool = true
          this.arrayToUpdate.push(JSON.parse(JSON.stringify(this.getListFirewall[i])))
        }
      }
      if (!bool) {
        this.showApplyBtn = false
      }
    },
    setOptions(value, option, item) {
      if (option === 'chain') {
        if (item[option].indexOf(value) !== -1) {
          option === 'chain' && item[option].length === 1 ? null : item[option] = item[option].filter(element => element !== value)
        } else {
          item[option].push(value)
          item[option].sort()
        }
      } else {
        item[option] = value
      }
      this.isEqual()
    },
    async deleteFirewallIP(param) {
      let paramValue = JSON.parse(JSON.stringify(param))
      FirewallEffectsApi.deleteIP(paramValue)
        .then(() => {
          if (paramValue.uid.length > 1) {
            paramValue.uid.shift()
            FirewallEffectsApi.deleteIP(paramValue)
              .then(() => {
                this.isEqual()
              })
          }
          this.firewallItem = {}
        })
    },
    createFirewallIP() {
      if (!this.errorIPText.length && this.newIP.chain.length) {
        FirewallEffectsApi.createIP({...this.newIP, chain: this.newIP.chain[0]})
          .then(() => {
            if (this.newIP.chain.length === 2) {
              FirewallEffectsApi.createIP({...this.newIP, chain: this.newIP.chain[1]})
            }
            this.addMode = false
            this.newIP.ip = ''
            this.newIP.chain = []
            this.newIP.description = ''
            this.$refs['new-vue-ip'].clearAll()
            this.errorIPText = ''
          })
          .catch(() => null)
      }
    },
    pasteListener() {
      window.addEventListener('keydown', this.pasteListenerHander)
    },
    deletePasteListener() {
      window.removeEventListener('keydown', this.pasteListenerHander)
    },
    pasteListenerHander(e) {
      if(e.ctrlKey && e.keyCode === 86 && this.$refs['new-vue-ip'].$refs.ipSegment[0] == document.activeElement) {
        this.$refs['new-vue-ip'].$refs.ipSegment[2].focus()
      }
    }
  },
  mounted() {
    this.popupItem = this.$refs.hideList
    // this.listenerIP()
    this.pasteListener()
    this.$store.dispatch('setGlobalWhiteListIP')
  },
  beforeDestroy() {
    this.deletePasteListener()
  },
  directives: {
    ClickOutside
  }
}
</script>
<style lang="scss">
.vue-ip.material-theme {
  border-bottom: none !important;
  color: var(--font-panel) !important;

  .segment {
    input {
      color: var(--font-panel) !important;

      &::placeholder {
        color: var(--input-color-placeholder);
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.toolbar {
  margin-top: 24px;
  margin-bottom: 10px;
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

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  div.btn-img {
    background-color: var(--paginator-bg);
    margin-left: 10px;
    box-shadow: -1px 0px 16px rgba(0, 0, 0, 0.15);
    border-radius: 8px;

    .add-btn-dep {

      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: var(--paginator-bg);
      border-radius: 8px;
      padding: 7px 7px 0 9px;
      width: 57px;
      max-width: 57px;
      height: 48px;
      transition: 0.3s;

      &:hover {
        transform: scale(1.1);
      }

      .add-btn-plus {
        margin-right: 0;
        margin-top: -7px;
      }

      .add-btn {
        margin-top: 10px;
      }

      .department-icon {
        margin-top: -7px;
      }
    }
  }

  .sort-tabs {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    margin-right: 24px;
    border-radius: 8px;
    padding: 12px;
    color: #6d6d6d;
    height: 100%;
    align-items: center;

    li {
      padding: 5px 16px;
      margin-right: 8px;
      font-weight: 300;
      position: relative;

      .input-field {
        height: 24px;
        width: 120px;
        background: var(--scenario-vnumber-input-bg);
      }

      .options-label {
        font-weight: 300;
        font-size: 16px;
        line-height: 19px;
        color: #276899;


        .input-field {
          height: 24px;
          width: 85px;
          padding: 5px 4px 5px 10px;
          font-weight: 300;
          color: var(--paginator-arrow);
          text-transform: capitalize;
          background: var(--scenario-vnumber-input-bg);
          justify-content: center;
        }

        .triangle {
          bottom: 5px;
          width: 76px;
          height: 24px;
          // right: 20px;

          path {
            stroke: var(--paginator-arrow);
          }
        }

        .list-related-numbers ::v-deep {
          background: var(--scenario-vnumber-input-bg);
          width: 85px;

          .active {
            background: #276899;
            color: white;
          }

          li {
            color: var(--paginator-arrow);
            padding: 0 12px;
            margin-right: 0;
            border-radius: 0;

            &:hover {
              background: #276899 !important;
              color: white;
            }
          }
        }
      }
    }
  }

  .btn-img {
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      transform: scale(1.1);
    }

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

  .right-tabs {
    position: absolute;
    right: 0;
    z-index: 1001;
    top: -35px;
  }
}

.wrap-table {
  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 6px;

    thead {
      .header {
        border: 2px solid var(--light-blue);
        background-color: var(--light-blue);
        padding-right: 29px;

        th {
          font-size: 14px;
          font-weight: 400;
          height: 44px;
          text-align: left;
          padding-left: 33px;
          cursor: pointer;
        }

        .address {
          width: 21%;
        }

        .chain {
          width: 13%;
          text-align: center;
          padding: 0 40px;
        }

        .description {
          width: 45%;
        }

        .updated {
          text-align: center;
          width: 13%;
        }

        .actions {
          // padding-right: 29px;
          width: 8%;
          text-align: center;
          padding-left: 0;
        }
      }
    }

    tbody {
      tr {
        border: 2px solid var(--statement-border);
        box-shadow: 0 5px 16px rgba(0, 0, 0, 0.1);
        -moz-box-shadow: 0 5px 16px rgba(0, 0, 0, 0.1);
        -webkit-box-shadow: 0 5px 16px rgba(0, 0, 0, 0.1);

        td {
          font-size: 16px;
          font-weight: 300;
          height: 52px !important;
          max-height: 52px !important;
          text-align: left;
          padding-left: 33px;
          position: relative;
          color: var(--font-panel);
          border-top: 2px solid var(--statement-border);
          border-bottom: 2px solid var(--statement-border);

          &.create-chain-td {
            padding: 0 40px;
          }

          &:first-child {
            border-left: 2px solid var(--statement-border);
          }

          &:last-child {
            border-right: 2px solid var(--statement-border);
          }

          &.chain-td {
            padding: 0 40px;

            .chain-btns {
              width: 129px;
              padding: 0;
            }
          }

          .cursor {
            cursor: pointer;

            &:hover {
              transform: scale(1.1);
            }

            &:active {
              transform: scale(1);
            }
          }
        }

        .btn-edit {
          position: absolute;
          top: calc(50% - 15px);
          left: -15px;
          background-color: var(--button-edit-dep-bg);
          height: 30px;
          width: 30px;
          border-radius: 50%;
          border: 2px solid var(--button-edit-dep-border);
          outline: none;
          transition: .3s ease;
          cursor: pointer;
          box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);

          &:hover {
            @extend .btn-del;

            .edit {
              display: none;
            }

            .del {
              display: block;
            }
          }

          .del {
            display: none;
          }

          img {
            width: 100%;
            height: 100%;
            transition: 0.3s;
          }
        }

        .create-address {
          display: flex;
          align-items: center;
          position: relative;


          input {
            width: 220px;
            background-color: transparent;
            height: 30px;
            border: none;
            outline: none;
            font-family: 'Roboto', sans-serif;
            font-size: 24px;
            font-weight: 300;
            color: var(--user-deps-input-color);
            margin-left: 13px;
            margin-top: -3px;
          }

          .error {
            position: absolute;
            color: red;
            top: 25px;
            left: 45px;
            font-size: 12px;
          }
        }

        .chain-btns {
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 0 40px;
          width: 100%;

          &.create-chain-btn {
            padding: 0;
          }

          .chain-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 46px;
            height: 20px;
            background: var(--not-active-btn-ip);
            border-radius: 6px;
            font-weight: 500;
            font-size: 14px;
            line-height: 16px;
            color: #FFFFFF;
            transition: .3s ease;
            transform: scale(1, 1);
            cursor: pointer;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);

            &:hover {
              transition: .3s ease;
              transform: scale(1.2, 1.2);
            }
          }
        }

        .input-description {
          width: 100%;
          height: 24px;
          background: var(--input-ip);
          border-radius: 4px;
          padding-left: 42px;
          display: flex;
          align-items: center;
          font-weight: 300;
          font-size: 12px;
          line-height: 14px;
          color: var(--font-panel);
          border: none;

          &::placeholder {
            color: var(--input-color-placeholder)
          }
        }

        .date {
          text-align: center;
        }

        .actions-btns {
          text-align: center;
          padding-left: 0;
          display: flex;
          align-items: center;
          justify-content: center;

          .btn-del {
            height: 24px;
            width: 24px;
            color: #FF3A29;
            font-size: 13px;
            text-align: center;
            line-height: 0;
            margin-left: 0;
            background-color: var(--button-edit-dep-bg);
            border-radius: 50%;
            outline: none;
            border: 2px solid var(--button-edit-dep-border);
            cursor: pointer;
            transition: .3s ease;
            transform: scale(1, 1);
            padding: 2px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);

            &:hover {
              transition: .3s ease;
              transform: scale(1.3, 1.3);
            }
          }

          .status-icon {
            cursor: pointer;
            transition: .3s ease;
            transform: scale(1, 1);
            margin-top: 6px;

            &:hover {
              transition: .3s ease;
              transform: scale(1.3, 1.3);
            }
          }

          .disabled-btn {
            cursor: auto;
            opacity: 0.2;

            &:hover {
              transform: scale(1, 1);
            }
          }
        }
      }
    }
  }
}

@media (max-width: 1920px) {
  .white-list-container {
    width: 1479.41px;
  }
}

@media (max-width: 1780px) {
  .white-list-container {
    width: 1330px;
  }
}

@media (max-width: 1600px) {
  .white-list-container {
    width: 1230px;
  }
}

@media (max-width: 1504px) {
  .white-list-container {
    width: 1136px;
  }
}

@media (max-width: 1408px) {
  .white-list-container {
    width: 1006px;
  }
}
</style>
