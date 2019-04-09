package com.aox.aoxmoney.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.aox.aoxmoney.api.config.property.AlgamoneyApiProperty;
import org.springframework.context.ApplicationContext;


@SpringBootApplication
@EnableConfigurationProperties(AlgamoneyApiProperty.class)
public class AoxmoneyApiApplication {

    public static ApplicationContext APPLICATION_CONTEXT;

	public static void main(String[] args) {
        APPLICATION_CONTEXT = SpringApplication.run(AoxmoneyApiApplication.class, args);

	}

	public static <T> T getBean(Class<T> type){
	    return APPLICATION_CONTEXT.getBean(type);
    }
}
