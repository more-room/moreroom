package com.moreroom.global.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.moreroom.global.dto.RedisUserInfo;
import java.util.HashMap;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class RedisUtil {

    private final StringRedisTemplate redisTemplate;//Redis에 접근하기 위한 Spring의 Redis 템플릿 클래스
    private final ObjectMapper objectMapper;

    public String getData(String key){//지정된 키(key)에 해당하는 데이터를 Redis에서 가져오는 메서드
        ValueOperations<String,String> valueOperations=redisTemplate.opsForValue();
        return valueOperations.get(key);
    }
    public void setData(String key,String value){//지정된 키(key)에 값을 저장하는 메서드
        ValueOperations<String,String> valueOperations=redisTemplate.opsForValue();
        valueOperations.set(key,value);
    }
    public void setDataExpire(String key,String value,long duration){//지정된 키(key)에 값을 저장하고, 지정된 시간(duration) 후에 데이터가 만료되도록 설정하는 메서드
        ValueOperations<String,String> valueOperations=redisTemplate.opsForValue();
        Duration expireDuration=Duration.ofSeconds(duration);
        valueOperations.set(key,value,expireDuration);
    }
    public void deleteData(String key){//지정된 키(key)에 해당하는 데이터를 Redis에서 삭제하는 메서드
        redisTemplate.delete(key);
    }

    // HashMap<Long, String> 저장
    public void saveLongStringHashMapExpire(String key, HashMap<Long, String> hashmap, long duration)
        throws JsonProcessingException {
        String hashmapJson = objectMapper.writeValueAsString(hashmap);
        redisTemplate.opsForValue().set(key, hashmapJson, Duration.ofSeconds(duration));
    }

    // HashMap<Long, String> 꺼내기
    public HashMap<Long, String> getLongStringHashMap(String key) throws JsonProcessingException {
        String hashmapJson = redisTemplate.opsForValue().get(key);
        if (hashmapJson != null) {
            return objectMapper.readValue(hashmapJson, new TypeReference<>() {}); // 반환타입이 HashMap<Long, String>이기 때문에 java가 타입 추론을 할 수 있다.(java7)
        }
        return null;
    }

    // RedisUserInfo 저장
    public void saveRedisUserInfo(String key, RedisUserInfo info, long duration)
        throws JsonProcessingException {
        String infoJson = objectMapper.writeValueAsString(info);
        redisTemplate.opsForValue().set(key, infoJson, Duration.ofSeconds(duration));
    }

    // RedisUserInfo 꺼내기
    public RedisUserInfo getRedisUserInfo(String key) throws JsonProcessingException {
        String infoJson = redisTemplate.opsForValue().get(key);
        if (infoJson != null) {
            return objectMapper.readValue(infoJson, new TypeReference<>() {});
        }
        return null;
    }

}