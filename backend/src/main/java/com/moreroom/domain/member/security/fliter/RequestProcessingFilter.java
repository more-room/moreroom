package com.moreroom.domain.member.security.fliter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.util.StringUtils;

public class RequestProcessingFilter extends AbstractAuthenticationProcessingFilter {

    private String usernameParameter = "userInfo";

    public RequestProcessingFilter(String defaultFilterProcessesUrl) {
        super(defaultFilterProcessesUrl);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
        throws AuthenticationException, IOException, ServletException {

        String requestInfo = obtainUsername(request);
        if( !StringUtils.hasText(requestInfo) ) {
            logger.error("사용자 정보 연계시 사용자 정보 미전송");
            throw new BadCredentialsException("사용자 정보가 올바르게 전송되지 않았습니다. 관리자에게 문의하여 주시기 바랍니다.");
        }

        String userNo = "1";

        UsernamePasswordAuthenticationToken authRequest = UsernamePasswordAuthenticationToken.unauthenticated(userNo,
            "user1");

        // Allow subclasses to set the "details" property
        setDetails(request, authRequest);
        return this.getAuthenticationManager().authenticate(authRequest);
    }

    protected void setDetails(HttpServletRequest request, UsernamePasswordAuthenticationToken authRequest) {
        authRequest.setDetails(this.authenticationDetailsSource.buildDetails(request));
    }

    public String obtainUsername(HttpServletRequest request){
        return request.getParameter(usernameParameter);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {

        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authResult);
        SecurityContextHolder.setContext(context);
        HttpSessionSecurityContextRepository secRepo = new HttpSessionSecurityContextRepository();
        secRepo.saveContext(context, request, response);

        super.successfulAuthentication(request, response, chain, authResult);
    }
}
