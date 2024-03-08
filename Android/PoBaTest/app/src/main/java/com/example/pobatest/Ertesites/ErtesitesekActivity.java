package com.example.pobatest.Ertesites;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.app.NotificationCompat;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.Manifest;
import android.app.NotificationManager;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.widget.ImageView;

import com.example.pobatest.FoActivity;
import com.example.pobatest.R;

import java.util.ArrayList;
import java.util.List;

public class ErtesitesekActivity extends AppCompatActivity {

    private ImageView nav_vissza_gomb;
    private RecyclerView recyclerview_ertesitesek;
    private List<Ertesites> ertesitesLista;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.ertesitesek_activity);

        Init();
        ListaFeltolt();

        nav_vissza_gomb.setOnClickListener(v -> {
            Intent intent = new Intent(ErtesitesekActivity.this, FoActivity.class);
            startActivity(intent);
            finish();
        });
    }

    public void Init() {
        nav_vissza_gomb = findViewById(R.id.nav_vissza_gomb);
        recyclerview_ertesitesek = findViewById(R.id.recyclerview_ertesitesek);
        ertesitesLista = new ArrayList<>();

        recyclerview_ertesitesek.setLayoutManager(new LinearLayoutManager(this));
        recyclerview_ertesitesek.setAdapter(new ErtesitesAdapter(getApplicationContext(), ertesitesLista));
    }

    public void ListaFeltolt() {
        Ertesites ertesites1 = new Ertesites(1, "Kakaós csiga", "Forró kakaós csiga!");
        Ertesites ertesites2 = new Ertesites(2, "456456", "Igen");
        Ertesites ertesites3 = new Ertesites(3, "789789", "Nagy Henrik The Third Jr");

        ertesitesLista.add(ertesites1);
        ertesitesLista.add(ertesites2);
        ertesitesLista.add(ertesites3);

        for (Ertesites ertesites : ertesitesLista) {
            String[] reqestPermission={ "android.permission.POST_NOTIFICATIONS" };
            NotificationCompat.Builder builder = new NotificationCompat.Builder(this, "channel_id")
                    .setSmallIcon(R.drawable.poba_logo)
                    .setContentTitle(ertesites.nev)
                    .setContentText(ertesites.uzenet)
                    .setPriority(NotificationCompat.PRIORITY_DEFAULT);

            NotificationManager nm = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
            if (!nm.areNotificationsEnabled()) {
                ActivityCompat.requestPermissions(this, reqestPermission, 10023);
            }
            nm.notify(ertesites.id, builder.build());
        }
    }
}