
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class UserLogin {

    public boolean authenticate(String username, String password) {
        boolean isAuthenticated = false;

        try (Connection conn = DatabaseConnection.getConnection()) {
            // SQL query to fetch the user by username and password
            String query = "SELECT * FROM users WHERE username = ? AND password = ?";
            PreparedStatement stmt = conn.prepareStatement(query);
            stmt.setString(1, username);
            stmt.setString(2, password);

            // Execute the query and check if a user is returned
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                // User exists and credentials are correct
                isAuthenticated = true;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return isAuthenticated;
    }
}
