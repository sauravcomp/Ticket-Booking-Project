
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {
    public static Connection getConnection() throws SQLException {
        String url = "jdbc:mysql://localhost:3306/management";
        String user = "root";
        String password = "saurav@123";
        Connection conn = DriverManager.getConnection(url, user, password);
        return conn;
    }
}
