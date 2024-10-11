package com.moreroom.global.repository;

import com.moreroom.global.util.StringUtil;
import com.querydsl.core.types.dsl.BooleanExpression;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Collection;
import lombok.extern.slf4j.Slf4j;

@Slf4j
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

    protected BooleanExpression ce(Object value, String name, String operator) {
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
            Method method;
            BooleanExpression expression = switch (operator.toLowerCase()) {
                case "eq" -> {
                    method = fieldValue.getClass().getMethod("eq", Object.class);
                    yield (BooleanExpression) method.invoke(fieldValue, value);
                }
                case "like" -> {
                    method = fieldValue.getClass().getMethod("like", String.class);
                    yield (BooleanExpression) method.invoke(fieldValue, "%" + value + "%");
                }
                case "loe" -> {
                    method = fieldValue.getClass().getMethod("loe", Number.class);
                    yield (BooleanExpression) method.invoke(fieldValue, value);
                }
                case "goe" -> {
                    method = fieldValue.getClass().getMethod("goe", Number.class);
                    yield (BooleanExpression) method.invoke(fieldValue, value);
                }
                case "in" -> {
                    method = fieldValue.getClass().getMethod("in", Collection.class);
                    yield (BooleanExpression) method.invoke(fieldValue, value);
                }
                default -> throw new IllegalArgumentException("Unsupported operator: " + operator);
            };

            return expression;
        } catch (Exception e) {
            log.error("Exception occurred: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
}
