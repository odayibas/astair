package tr.com.astair.astair.logger;

import java.util.*;
import java.io.*;
import java.util.logging.Logger;

public class MyLogger {

    public static void logger(String message, Object o){

        try{
            String nameofCallerMethod = new Throwable().getStackTrace()[1].getMethodName();
            long thread_id = Thread.currentThread().getId();

            File f = new File("./log.txt");
            FileWriter fw = new FileWriter(f, true);
            PrintWriter pw = new PrintWriter(fw, true);
            pw.printf("Tarih: %s Class: %s Method: %s Message: %s Thread ID: %d\n",
                    new Date(), o.getClass().getName(), nameofCallerMethod, message, thread_id);
            pw.close();

            Logger logger = Logger.getLogger(o.getClass().getName());
            logger.info("Tarih" + new Date() + " Class: " + o.getClass().getName() + " Method: " + nameofCallerMethod
                        + "Message: " + message + " Thread ID: " + thread_id);

        } catch(IOException e){e.printStackTrace();}

    }

}
