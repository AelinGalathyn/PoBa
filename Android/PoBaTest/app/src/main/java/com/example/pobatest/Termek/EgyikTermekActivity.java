package com.example.pobatest.Termek;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.res.ResourcesCompat;
import androidx.recyclerview.widget.LinearLayoutManager;

import android.content.Context;
import android.content.Intent;
import android.graphics.BitmapFactory;
import android.graphics.Rect;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.text.Html;
import android.util.Log;
import android.view.KeyEvent;
import android.view.MotionEvent;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.example.pobatest.ApiCalls.HttpClient;
import com.example.pobatest.R;
import com.example.pobatest.Rendeles.EgyikRendelesActivity;
import com.koushikdutta.ion.Ion;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.util.Objects;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.Response;

public class EgyikTermekActivity extends AppCompatActivity {

    private ImageView nav_vissza_gomb;
    private ImageView mennyiseg_icon;
    private EditText darab_editText;
    private TextView termek_reszletek_textview;
    private TextView termek_kep_nev_textview;
    private ImageView termek_kep_helye;
    private Termek termek;
    private ImageButton darab_confirm_button;
    private Double newQty;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.termek_egyik_activity);

        Init();

        termek_reszletek_textview.setOnClickListener(v -> {
            if(darab_editText.isFocused()) {
                InputMethodManager imm = (InputMethodManager) getSystemService(Context.INPUT_METHOD_SERVICE);
                imm.hideSoftInputFromWindow(v.getWindowToken(), 0);
                darab_editText.clearFocus();
                darab_confirm_button.setVisibility(View.VISIBLE);
            }
        });

        darab_confirm_button.setOnClickListener(v -> {
            newQty = Double.parseDouble(darab_editText.getText().toString());
            modifyQty();
            darab_confirm_button.setVisibility(View.INVISIBLE);
        });

        nav_vissza_gomb.setOnClickListener(v -> {
            Intent intent = new Intent(this, TermekekActivity.class);
            startActivity(intent);
            finish();
        });
    }

    public void Init() {
        termek = getIntent().getParcelableExtra("termek");

        darab_editText = findViewById(R.id.darab_editText);
        darab_confirm_button = findViewById(R.id.darab_confirm_button);
        termek_reszletek_textview = findViewById(R.id.termek_reszletek_textview);
        termek_kep_nev_textview = findViewById(R.id.termek_kep_nev_textview);
        nav_vissza_gomb = findViewById(R.id.nav_vissza_gomb);
        termek_kep_helye = findViewById(R.id.termek_kep_helye);
        mennyiseg_icon = findViewById(R.id.mennyiseg_icon);

        darab_editText.setText(String.valueOf(termek.qty));
        termek_reszletek_textview.setText(termekReszletekString());
        termek_kep_nev_textview.setText(termek.name);
        mennyiseg_icon.setImageResource(termek.mennyiseg_img);

        setTermekKepHelye();

        if (termek.packaged) {
            darab_editText.setVisibility(View.GONE);
        }
    }

    public String termekReszletekString() {
        String szoveg = "";

        szoveg += "Kategóriák: <hr><br>" + String.join(", ", termek.cat_name.subList(0, 5));

        return Html.fromHtml(szoveg, Html.FROM_HTML_MODE_LEGACY).toString();
    }

    private void setTermekKepHelye() {
        Ion.with(this)
                .load(termek.pic_url)
                .withBitmap()
                .intoImageView(termek_kep_helye);
    }

    private void modifyQty() {
        Callback cb = new Callback() {
            @Override
            public void onFailure(@NonNull Call call, @NonNull IOException e) {
                Toast.makeText(EgyikTermekActivity.this, "A kiválasztott termék lekérése sikertelen.", Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onResponse(@NonNull Call call, @NonNull Response response) {
                termek.qty = newQty;
                termek.mennyisegAlapjanIcon();

                runOnUiThread(() -> mennyiseg_icon.setImageResource(termek.mennyiseg_img));
            }
        };

        HttpClient hc = new HttpClient();
        String url = "item";
        hc.getHttpClient(EgyikTermekActivity.this);
        hc.modifyTermekQty(this, url, cb, newQty, termek.sku);
    }
}