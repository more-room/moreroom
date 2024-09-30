package com.moreroom.global.util;

import java.util.Random;

public class GlobalUtil {

    public static Integer getRandomThemeId() {
        int MAX_THEME_ID = 1338;
        Random r = new Random();
        return r.nextInt(MAX_THEME_ID) + 1;
    }

}
