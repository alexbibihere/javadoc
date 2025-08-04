package com.sutpc.edo.portal;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

public class NovelCrawler {
    private static final String BASE_URL = "https://www.biquge186.com/shu/158267/";
    private static final String OUTPUT_FILE = "人在吞噬，觉醒氪金修仙系统.txt";

    public static void main(String[] args) {
        try {
            System.out.println("开始下载小说: 人在吞噬，觉醒氪金修仙系统");

            // 获取目录页
            Document tocDoc = Jsoup.connect(BASE_URL + "index.html").get();
            Elements chapterLinks = tocDoc.select("div#list dl dd a");

            try (BufferedWriter writer = new BufferedWriter(new FileWriter(OUTPUT_FILE))) {
                writer.write("书名: 人在吞噬，觉醒氪金修仙系统\n");
                writer.write("作者: 喵喵天子\n\n");

                int totalChapters = chapterLinks.size();
                System.out.println("总章节数: " + totalChapters);

                for (int i = 0; i < totalChapters; i++) {
                    Element link = chapterLinks.get(i);
                    String chapterUrl = "https://www.biquge186.com" + link.attr("href");

                    // 获取章节内容
                    Document chapterDoc = Jsoup.connect(chapterUrl).get();
                    String title = chapterDoc.select("div.bookname h1").text();
                    String content = chapterDoc.select("div#content").html()
                            .replace("<br>", "\n")
                            .replace("&nbsp;", " ")
                            .replace("笔趣阁 www.biquge186.com，最快更新人在吞噬，觉醒氪金修仙系统最新章节！", "");

                    // 写入文件
                    writer.write(title + "\n\n");
                    writer.write(content + "\n\n");
                    writer.flush();

                    // 显示进度
                    System.out.printf("已下载: %d/%d (%.1f%%) %s%n",
                            i+1, totalChapters, (i+1)*100.0/totalChapters, title);

                    // 延迟1-3秒
                    Thread.sleep(1000 + (long)(Math.random() * 2000));
                }

                System.out.println("\n小说下载完成！已保存到: " + OUTPUT_FILE);
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}