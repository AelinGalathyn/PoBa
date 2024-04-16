package com.example.pobatest.Bejelentkezes;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.Toast;

import com.example.pobatest.ApiCalls.HttpClient;
import com.example.pobatest.ApiCalls.SharedPrefWebshopId;
import com.example.pobatest.FoActivity;
import com.example.pobatest.R;
import com.example.pobatest.Users.IUsers;
import com.example.pobatest.Users.ResponseMessage;
import com.example.pobatest.Users.UsersInputDto;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.FormBody;
import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import okhttp3.RequestBody;
import okhttp3.Response;
import retrofit2.Retrofit;

public class EgyszeriBelepesActivity extends AppCompatActivity {
    private ImageButton egyszeri_belepes_gomb;
    private EditText felhasznalonev_input;
    private EditText jelszo_input;
    private Retrofit retrofit;
    private OkHttpClient.Builder okBuild;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.belepes_egyszeri_activity);

        Init();

        egyszeri_belepes_gomb.setOnClickListener(view -> {
            String username = felhasznalonev_input.getText().toString();
            String password = jelszo_input.getText().toString();

            if (!username.isEmpty() || !password.isEmpty()) {
                UsersInputDto user = new UsersInputDto(username, password);
                login(user);
            }
        });
    }

    public void Init() {
        egyszeri_belepes_gomb = findViewById(R.id.egyszeri_belepes_gomb);
        felhasznalonev_input = findViewById(R.id.felhasznalonev_input);
        jelszo_input = findViewById(R.id.jelszo_input);
    }

    public void login(UsersInputDto user) {
        Callback cb = new Callback() {
            @Override
            public void onFailure(@NonNull Call call, @NonNull IOException e) {
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        Toast.makeText(EgyszeriBelepesActivity.this, "Ilyen fiók nem létezik.", Toast.LENGTH_SHORT).show();
                    }
                });
            }

            @Override
            public void onResponse(@NonNull Call call, @NonNull Response response) throws IOException {
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        if (response.code() == 201) {
                            Toast.makeText(EgyszeriBelepesActivity.this, "Sikeres belépés.", Toast.LENGTH_SHORT).show();
                            String responseData = null;
                            try {
                                responseData = response.body().string();
                                Log.i("body", responseData);
                                JSONObject jsonObject = new JSONObject(responseData);
                                Integer webshopid = jsonObject.getInt("webshopid");
                                SharedPrefWebshopId sp = new SharedPrefWebshopId();
                                sp.setWebshopId(EgyszeriBelepesActivity.this, webshopid.toString());
                            } catch (IOException e) {
                                throw new RuntimeException(e);
                            } catch (JSONException e) {
                                throw new RuntimeException(e);
                            }
                            Intent intent = new Intent(EgyszeriBelepesActivity.this, FoActivity.class);
                            startActivity(intent);
                            finish();
                        } else {
                            Log.e("LOGIN", "Login failed: " + response);
                            Toast.makeText(EgyszeriBelepesActivity.this, " " + response, Toast.LENGTH_SHORT).show();
                        }
                    }
                });
            }
        };

        HttpClient hc = new HttpClient();

        hc.makeLoginHttpRequest(hc, user, this, cb);
    }
}