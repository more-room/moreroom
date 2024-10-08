package com.moreroom.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;
import java.util.concurrent.ThreadPoolExecutor;

@Configuration
@EnableAsync
public class AsyncConfig {
    @Bean
    public Executor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        // 코어 스레드 수 : CPU 코어 수 + 1
        int corePoolSize = Runtime.getRuntime().availableProcessors() + 1;
        executor.setCorePoolSize(corePoolSize);
        // 최대 스레드 수 : I/O 바운드 작업 : CPU 코어 수 * 2 + 1
        int maxPoolSize = corePoolSize * 2 + 1;
        executor.setMaxPoolSize(maxPoolSize);

        // 큐 용량: 일반적으로 50~1000 사이의 값 사용
        executor.setQueueCapacity(500);
        executor.setThreadNamePrefix("AsyncTask-");
        //거부정책: CallerRunsPolicy -> 큐가 가득 찼을 때 호출 스레드에서 작업 실행
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
        executor.setAllowCoreThreadTimeOut(true);
        executor.setKeepAliveSeconds(60); //유휴 스레드는 60초 후에 제거

        executor.initialize();
        return executor;
    }
}
