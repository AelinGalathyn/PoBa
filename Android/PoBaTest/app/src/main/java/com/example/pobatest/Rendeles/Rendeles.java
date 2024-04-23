package com.example.pobatest.Rendeles;

import android.content.Context;
import android.content.res.Resources;
import android.graphics.drawable.Drawable;
import android.os.Parcel;
import android.os.Parcelable;
import android.util.Log;

import androidx.core.content.res.ResourcesCompat;

import com.example.pobatest.R;
import com.example.pobatest.Rendeles.RendelesTermek;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class Rendeles implements Parcelable {
    public String orderid;
    public Date date;
    public String status_id;
    public String sender;
    public String payment;
    public Integer gross;
    public Double weight;
    public String c_name;
    public List<RendelesTermek> termekList;
    public Integer image;

    protected Rendeles(Parcel in) {
        orderid = in.readString();
        long tmpDate = in.readLong();
        date = tmpDate == -1 ? null : new Date(tmpDate);
        status_id = in.readString();
        sender = in.readString();
        payment = in.readString();
        gross = in.readByte() == 0 ? null : in.readInt();
        weight = in.readByte() == 0 ? 0 : in.readDouble();
        c_name = in.readString();
        termekList = new ArrayList<>();
        in.readList(termekList, RendelesTermek.class.getClassLoader());
        image = in.readInt();
    }

    public Rendeles(JSONObject object){
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy.MM.dd HH:mm:ss", new Locale("hu", "HU"));
        try {
            orderid = object.getString("orderid");
            date = formatter.parse(object.getString("date"));
            status_id = object.getString("status_id");
            sender = object.getString("sender");
            payment = object.getString("payment");
            gross = object.getInt("gross");
            weight = object.has("weight") ? object.getDouble("weight") : 0.0;
            c_name = object.getJSONObject("customer").getString("c_name");

            termeklistFeltolt(object);
            setImage();

        } catch (JSONException | ParseException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {

        dest.writeString(orderid);
        dest.writeLong(date != null ? date.getTime() : -1);
        dest.writeString(status_id);
        dest.writeString(sender);
        dest.writeString(payment);
        dest.writeByte(gross == null ? (byte) 0 : (byte) 1); if(gross != null) dest.writeInt(gross);
        dest.writeByte(weight == null ? (byte) 0 : (byte) 1); if (weight != null) dest.writeDouble(weight);
        dest.writeString(c_name);
        dest.writeList(termekList);
        dest.writeInt(image);
    }

    @Override
    public int describeContents() {
        return 0;
    }

    public static final Creator<Rendeles> CREATOR = new Creator<Rendeles>() {
        @Override
        public Rendeles createFromParcel(Parcel in) {
            return new Rendeles(in);
        }

        @Override
        public Rendeles[] newArray(int size) {
            return new Rendeles[size];
        }
    };

    private void termeklistFeltolt(JSONObject object) {
        termekList = new ArrayList<>();

        try {
            JSONArray termekjson = object.getJSONArray("items");
            for (int i = 0; i < termekjson.length(); i++) {
                RendelesTermek termek = new RendelesTermek(termekjson.getJSONObject(i));
                termekList.add(termek);
            }
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
    }

    private void setImage() {
        String senderLower = sender.toLowerCase();

        image = senderLower.contains("gls") ? R.drawable.gls_logo :
                (senderLower.contains("posta") || senderLower.contains("mpl")) ? R.drawable.mpl :
                        senderLower.contains("foxpost") ? R.drawable.foxpost_logo : 0;
    }
}