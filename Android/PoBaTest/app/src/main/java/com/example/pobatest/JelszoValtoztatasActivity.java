package com.example.pobatest;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.example.pobatest.ApiCalls.HttpClient;
import com.example.pobatest.Bejelentkezes.EgyszeriBelepesActivity;

import java.io.IOException;
import java.util.Objects;
import java.util.regex.Pattern;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.Response;

public class JelszoValtoztatasActivity extends AppCompatActivity {

    private EditText regi_jelszo_input;
    private EditText uj_jelszo_input;
    private ImageView nav_vissza_gomb;
    private ImageButton password_ok_button;
    private String regi_jelszo;
    private String uj_jelszo;
    private AlertDialog ab;
    private ImageButton popup_ok_icon;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.jelszo_valtoztatas_activity);

        Init();

        nav_vissza_gomb.setOnClickListener(v -> {
            Intent intent = new Intent(JelszoValtoztatasActivity.this, ProfilBeallitasokActivity.class);
            startActivity(intent);
            finish();
        });

        password_ok_button.setOnClickListener(v -> {
            regi_jelszo = regi_jelszo_input.getText().toString();
            uj_jelszo = uj_jelszo_input.getText().toString();

            changePassword(regi_jelszo, uj_jelszo);
        });

        popup_ok_icon.setOnClickListener(v -> ab.dismiss());

    }

    private void changePassword(String regiJelszo, String ujJelszo) {
        String regex = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$";
        Pattern pattern = Pattern.compile(regex, Pattern.MULTILINE);

        if (pattern.matcher(ujJelszo).find() && !regiJelszo.isEmpty()) {
            ChangePasswordBackend();
        }
        else {
            ab.show();
        }
    }

    public void Init() {
        nav_vissza_gomb = findViewById(R.id.nav_vissza_gomb);
        regi_jelszo_input = findViewById(R.id.regi_jelszo_input);
        uj_jelszo_input = findViewById(R.id.uj_jelszo_input);
        password_ok_button = findViewById(R.id.password_ok_button);

        LayoutInflater inflater = this.getLayoutInflater();
        View v = inflater.inflate(R.layout.apikulcs_popup_activity, null);

        TextView kerdes_helye = v.findViewById(R.id.kerdes_helye);
        TextView webshop_nev_helye = v.findViewById(R.id.webshop_nev_helye);
        TextView apikey_helye = v.findViewById(R.id.apikey_helye);
        kerdes_helye.setText(R.string.helytelen_jelszo_felirat);
        webshop_nev_helye.setText(R.string.jelszo_regex_felszolitas);
        apikey_helye.setText("");

        AlertDialog.Builder abBuilder = new AlertDialog.Builder(this);
        ab = abBuilder.setView(v).create();
        Objects.requireNonNull(ab.getWindow()).setBackgroundDrawableResource(R.drawable.custom_popup);

        RelativeLayout popup_layout = v.findViewById(R.id.popup_layout);
        ImageButton popup_no_icon = popup_layout.findViewById(R.id.popup_no_icon);
        ImageButton popup_yes_icon = popup_layout.findViewById(R.id.popup_yes_icon);
        popup_ok_icon = popup_layout.findViewById(R.id.popup_ok_icon);

        popup_no_icon.setVisibility(View.GONE);
        popup_yes_icon.setVisibility(View.GONE);
        popup_ok_icon.setVisibility(View.VISIBLE);
    }

    public void ChangePasswordBackend() {
        Callback cb = new Callback() {
            @Override
            public void onFailure(@NonNull Call call, @NonNull IOException e) {
                Toast.makeText(JelszoValtoztatasActivity.this, "Sikertelen jelszó változtatás.", Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onResponse(@NonNull Call call, @NonNull Response response) {
                if (response.code() == 201) {
                    Intent intent = new Intent(JelszoValtoztatasActivity.this, EgyszeriBelepesActivity.class);
                    startActivity(intent);
                    finish();
                }
                else {
                    Toast.makeText(JelszoValtoztatasActivity.this, "Sikeres jelszó változtatás.", Toast.LENGTH_SHORT).show();
                }
            }
        };

        HttpClient hc = new HttpClient();
        String url = "changePassword";
        hc.getHttpClient(JelszoValtoztatasActivity.this);
        hc.changePassword(this, url, cb, regi_jelszo, uj_jelszo);
    }
}