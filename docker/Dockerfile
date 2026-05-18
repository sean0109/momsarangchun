# cafe24(표준 웹호스팅)와 유사한 로컬 검증용 Apache 환경
# - Apache 2.4 (cafe24와 동일 계열)
# - mod_rewrite 활성화 (.htaccess RewriteRule 동작)
# - AllowOverride All (.htaccess 규칙 전체 적용)
FROM httpd:2.4

RUN sed -i \
    -e 's|^#LoadModule rewrite_module|LoadModule rewrite_module|' \
    -e 's|AllowOverride None|AllowOverride All|g' \
    /usr/local/apache2/conf/httpd.conf
