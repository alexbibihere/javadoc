---
icon: pen-to-square
date: 2022-01-09
title: CountDownLatch的使用
---

# Countdownlatch的使用

## 代码
```java
import java.util.concurrent.CountDownLatch;

public class CountDownLatchDemo {
    public static void main(String[] args) throws InterruptedException {
        int count = 5;
        CountDownLatch latch = new CountDownLatch(count);

        for (int i = 1; i <= count; i++) {
            new Thread(() -> {
                System.out.println(Thread.currentThread().getName() + " is running");
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                latch.countDown();
            }, "Thread-" + i).start();
        }

        latch.await();
        System.out.println("All threads have finished");
    }
}
```

