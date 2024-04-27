package com.example.pobatest.Functions;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageButton;
import android.widget.RelativeLayout;
import android.widget.TextView;

import androidx.appcompat.app.AlertDialog;

import com.example.pobatest.R;

import java.util.Objects;

public class functions {
    public void showPopup(Context context, String felirat, String leiras) {
        View v = LayoutInflater.from(context).inflate(R.layout.apikulcs_popup_activity, null);
        TextView kerdes_helye = v.findViewById(R.id.kerdes_helye);
        TextView webshop_nev_helye = v.findViewById(R.id.webshop_nev_helye);
        TextView apikey_helye = v.findViewById(R.id.apikey_helye);
        kerdes_helye.setText(felirat);
        webshop_nev_helye.setText(leiras);
        apikey_helye.setText("");

        AlertDialog.Builder abBuilder = new AlertDialog.Builder(context);
        AlertDialog ab = abBuilder.setView(v).create();
        Objects.requireNonNull(ab.getWindow()).setBackgroundDrawableResource(R.drawable.custom_popup);

        RelativeLayout popup_layout = v.findViewById(R.id.popup_layout);
        ImageButton popup_no_icon = popup_layout.findViewById(R.id.popup_no_icon);
        ImageButton popup_yes_icon = popup_layout.findViewById(R.id.popup_yes_icon);
        ImageButton popup_ok_icon = popup_layout.findViewById(R.id.popup_ok_icon);

        popup_no_icon.setVisibility(View.GONE);
        popup_yes_icon.setVisibility(View.GONE);
        popup_ok_icon.setVisibility(View.VISIBLE);

        popup_ok_icon.setOnClickListener(view2 -> ab.dismiss());

        ab.show();
    }
}
