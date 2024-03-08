package com.example.pobatest.Beallitasok;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.app.NotificationCompat;

import android.app.NotificationManager;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.widget.ImageView;

import com.example.pobatest.BeallitasokActivity;
import com.example.pobatest.Ertesites.ErtesitesekActivity;
import com.example.pobatest.FoActivity;
import com.example.pobatest.R;

public class BeallitasokErtesitesekActivity extends AppCompatActivity {

    private ImageView nav_vissza_gomb;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.beallitasok_ertesitesek_activity);

        Init();

        nav_vissza_gomb.setOnClickListener(v -> {
            Intent intent = new Intent(BeallitasokErtesitesekActivity.this, BeallitasokActivity.class);
            startActivity(intent);
            finish();
        });
    }

    private void Init() {
        nav_vissza_gomb = findViewById(R.id.nav_vissza_gomb);

        String[] reqestPermission={ "android.permission.POST_NOTIFICATIONS" };
        NotificationCompat.Builder builder = new NotificationCompat.Builder(this, "channel_id")
                .setSmallIcon(R.drawable.poba_logo)
                .setContentTitle("")
                .setContentText("ertesites.uzenet")
                .setPriority(NotificationCompat.PRIORITY_DEFAULT);

        NotificationManager nm = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        if (!nm.areNotificationsEnabled()) {
            ActivityCompat.requestPermissions(this, reqestPermission, 10023);
        }
        nm.notify(0, builder.build());
    }
}