package tr.com.astair.astair.logger;

import java.util.*;
import java.io.*;

public class MyLogger {

    public static void logger(String message, Object o){

        try{
            String nameofCallerMethod = new Throwable().getStackTrace()[1].getMethodName();
            File f = new File("./log.txt");
            FileWriter fw = new FileWriter(f, true);
            PrintWriter pw = new PrintWriter(fw, true);
            pw.printf("Tarih: %s Class: %s Method: %s Message: %s Thread ID: %d\n",
                    new Date(), o.getClass().getName(), nameofCallerMethod, message, Thread.currentThread().getId());
            pw.close();
        } catch(IOException e){e.printStackTrace();}

    }

}
