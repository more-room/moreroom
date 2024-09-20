package com.moreroom.global.repository;

import com.moreroom.global.util.StringUtil;
import com.querydsl.core.types.dsl.BooleanExpression;
import java.lang.reflect.Field;
import java.lang.reflect.Method;

public class QuerydslRepositoryCustom {

    private final Object entity;

    public QuerydslRepositoryCustom(Object entity) {
        this.entity = entity;
    }

    protected BooleanExpression eq(Object value, String name) {
        try {
            if (value == null) {
                return null;
            }

            if (value.getClass().getTypeName().equals("java.lang.String")) {

                if (StringUtil.isEmpty(String.valueOf(value))) {
                    return null;
                }

            }

            Field field = entity.getClass().getDeclaredField(name);

            Object fieldValue = field.get(entity);
            Method method = fieldValue.getClass().getMethod("eq", Object.class);
            BooleanExpression eq = (BooleanExpression) method.invoke(fieldValue, value);
            return eq;
        } catch (Exception e) {
            return null;
        }
    }
}
