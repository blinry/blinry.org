GDPC                                                                                   res://black.tres`      s       � �}:�7"ށ@�	f   res://eyes.tres �      q       }Å�}7Q%҂���T   res://game.gd.remap �.             &=F�k'b�Зz��ع   res://game.gdc  `      �      �"}QG���a�%�b�_   res://grey.tres 0	      r       ����x���0yL�/   res://leg.gd.remap  �.             [��l��Z�M�U�   res://leg.gdc   �	      �      �NA߉�e/�>�q�O��   res://leg.tscn  �      �      �7�����Oy�!�m   res://main.gd.remap �.             ֤�\n�������Dݮ�   res://main.gdc  �      $      䨩�/�Z�D��Θor   res://main.tscn �      �      &����ç}�m�V�y   res://person.gd.remap    /      !       �����ZFw�X( s   res://person.gdcP      �       _�S���
�5���'�   res://person.tscn   0      X      �YB|��Z}�Ʉ��ϸ�   res://project.binary`/      $      ΊT�BՒ��O=��}   res://spider.gd.remap   0/      !       �����( ��):*k���   res://spider.gdc�"      �      �&h��鲪w�Q�w   res://spider.tscn   0(      �      ,���z�Q��RTI��   res://white.tres .      r        ݙB��?�v�5�t�]�    [gd_resource type="SpatialMaterial" format=2]

[resource]
albedo_color = Color( 0.141176, 0.109804, 0.0823529, 1 )
             [gd_resource type="SpatialMaterial" format=2]

[resource]
albedo_color = Color( 0.556863, 0.52549, 0.447059, 1 )
               GDSC             �      ���Ӷ���   ����Ӷ��   ����Ӷ��   �����϶�   ���������Ӷ�   �������������Ӷ�   ���������Ӷ�   �������Ӷ���   ���Ӷ���   ����   ���ض���   ����󶶶   ���������Ӷ�   ����Ӷ��   ����������Ŷ   ���򶶶�   ��������Ӷ��   �������Ӷ���   ��϶      user://savegame.json                                                                 	       
   $      %      -      6      7      B      L      R      U      V      ^      g      q      t      u      �      �      �      �      �      �      �       3YY;�  Y;�  NOYY0�  PQV�  �  PQ�  Y0�  PQV�  .NO�  Y0�  PQX�  V�  ;�  �  T�	  PQ�  �  �  T�
  P�  R�  T�  Q�  �  T�  P�Q  P�  QQ�  �  T�  PQ�  .�  �  Y0�  PQX�  V�  ;�  �  T�	  PQ�  &�  T�  P�  QV�  .�  �  �  �  T�
  P�  R�  T�  Q�  �  �  �  PQ�  ;�  �P  P�  T�  PQQ�  )�  �  V�  �  L�  M�  L�  M�  �  T�  PQ�  .�  ` [gd_resource type="SpatialMaterial" format=2]

[resource]
albedo_color = Color( 0.027451, 0.239216, 0.113725, 1 )
              GDSC            �      ������ڶ   ڶ��   �����¶�   ��������������¶   �������Ŷ���   ����׶��   ����¶��   ������¶   Ҷ��   ����������������Ӷ��   ����׶��   �������Ѷ���   �������ض���   �������Ѷ���   �������Ӷ���   �������������������۶���   �����ض�   �����޶�   ��¶   ϶��               �������?                               	            "      #      *   	   5   
   F      M      R      Z      g      x      �      �      �      �      �      �      �      �      �      �      3YY;�  YY8;�  �  P�  R�  R�  QY;�  �  P�  R�  R�  Q�  Y0�  P�  QV�  �  �  P�  R�  R�  Q�  W�  T�  P�  R�  P�  RR�  QQ�  ;�  �	  PQ�  ;�
  �  �  &�  
�  �  V�  �
  �  P�  P�  �  QQ�  W�  �  T�  �  P�
  RZR�  Q�  W�  �  �  T�  �  P�  �
  R�  R�  QYY0�  PQV�  .P�  �  PQT�  QT�  PQYY0�	  PQV�  .P�  �  PQT�  QT�  PQYY0�  PQV�  .W�  T�  T�  Y`            [gd_scene load_steps=4 format=2]

[ext_resource path="res://black.tres" type="Material" id=1]
[ext_resource path="res://leg.gd" type="Script" id=2]

[sub_resource type="CapsuleMesh" id=1]
radius = 0.05

[node name="Leg" type="Spatial"]
script = ExtResource( 2 )

[node name="Pivot" type="Spatial" parent="."]

[node name="UpperLeg" type="Spatial" parent="Pivot"]
transform = Transform( -1.62921e-07, -0.795516, 0.605933, 0, 0.605933, 0.795516, -1, 1.29606e-07, -9.8719e-08, 0, 0, 0 )

[node name="CSGMesh" type="CSGMesh" parent="Pivot/UpperLeg"]
transform = Transform( 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0.5 )
mesh = SubResource( 1 )
material = ExtResource( 1 )

[node name="LowerLeg" type="Spatial" parent="Pivot/UpperLeg"]
transform = Transform( 1, 0, 0, 0, -0.144011, -0.989576, 0, 0.989576, -0.144011, 0, 2.98023e-08, 1 )

[node name="CSGMesh2" type="CSGMesh" parent="Pivot/UpperLeg/LowerLeg"]
transform = Transform( 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0.5 )
mesh = SubResource( 1 )
material = ExtResource( 1 )
              GDSC   %      C   Y     ������ڶ   �����׶�   �����׶�   ��������������¶   ��ն   �����ض�   �����϶�   ����¶��   �������������Ӷ�   ��������������������   ߶��   �����������ض���   ƶ��   �������Ӷ���   ����������ض   ��������Ҷ��   �������Ŷ���   ����׶��   ����Ӷ��   ����Ӷ��   �����������¶���   �����������������ض�   ��Ŷ   �������������϶�   �����������������ض�   �����������������ڶ�   ������ڶ   ����������������������Ҷ   ����������������Ҷ��   ϶��   �����Ķ�   �������Ӷ���   �����������������ƶ�   Ҷ��   ��Ķ   ���������Ҷ�   �����޶�  333333�?             res://person.tscn      
                 �������?      lower            d     �������?      person                           
                                 	       
   !      '      0      ;      ?      @      F      O      h      m      n      u      �      �      �      �      �      �      �      �      �      �       �   !   �   "   �   #   �   $   �   %   �   &   �   '   �   (   �   )   �   *   �   +   �   ,   �   -   �   .     /     0     1     2   #  3   ,  4   6  5   >  6   ?  7   I  8   M  9   N  :   O  ;   P  <   Q  =   R  >   S  ?   T  @   U  A   V  B   W  C   3YY5;�  W�  YY;�  YY;�  �  YY5;�  ?P�  QYY0�  PQV�  �  T�  P�  T�	  Q�  )�
  �K  P�  R�  QV�  �  PQ�  Y0�  PQV�  ;�  �  T�  PQ�  �  T�  �  P�(  P�  R�  QR�  R�(  P�  R�  QQ�  �  P�  Q�  Y0�  P�  QV�  ;�  �	  P�  P�  R�  R�  QR�  Q�  ;�  �  PQT�  PQ�  ;�  �  T�  P�  T�  P�  QR�  T�  P�  QQ�  �  �  �  ;�  �  &�  T�  P�  QV�  �  �  �  �  �  �  �  �  �  �  �  �	  �  �  �  &�  	V�  �  �  �  &�  T�  P�  QV�  �  �
  �  �  �  &�  V�  �  T�  �  �  W�  T�  �  PW�  T�  R�  R�  Q�  �  )�  �  PQT�   P�  QV�  ;�!  P�  T�  W�  T�  Q�  �!  T�  �  �  ;�"  �!  T�#  PQ�  &�!  T�$  PQ	�  V�  �  T�  �  �!  �  �  &�&  PQ�	  �  V�  �  PQYYYYYYYYYYY`            [gd_scene load_steps=6 format=2]

[ext_resource path="res://spider.tscn" type="PackedScene" id=1]
[ext_resource path="res://white.tres" type="Material" id=2]
[ext_resource path="res://main.gd" type="Script" id=3]

[sub_resource type="Environment" id=1]
ambient_light_color = Color( 1, 1, 1, 1 )
ambient_light_energy = 5.56

[sub_resource type="PlaneMesh" id=2]
material = ExtResource( 2 )
size = Vector2( 1000, 1000 )

[node name="Main" type="Spatial"]
script = ExtResource( 3 )

[node name="Camera" type="Camera" parent="."]
transform = Transform( 1, 0, 0, 0, 0.809017, 0.587785, 0, -0.587785, 0.809017, -0.235487, 3.62711, 5.37608 )
environment = SubResource( 1 )
far = 1000.0

[node name="Spider" parent="." instance=ExtResource( 1 )]

[node name="Plane" type="CSGMesh" parent="."]
transform = Transform( 1, 0, 0, 0, 1, 0, 0, 0, 1, 4.05312e-06, -0.00340211, 0.00154305 )
mesh = SubResource( 2 )
              GDSC          	         ������ڶ   �����϶�   ������������ض��   ���׶���   ���������Ӷ�                   	                                 	   3YY0�  PQV�  -YYY0�  P�  QV�  �  PQY`            [gd_scene load_steps=6 format=2]

[ext_resource path="res://black.tres" type="Material" id=1]
[ext_resource path="res://person.gd" type="Script" id=2]

[sub_resource type="CylinderMesh" id=1]
top_radius = 0.02
bottom_radius = 0.05
height = 0.1

[sub_resource type="SphereMesh" id=2]
radius = 0.04
height = 0.08

[sub_resource type="CylinderShape" id=3]
radius = 0.0558893
height = 0.133656

[node name="Person" type="Spatial" groups=[
"person",
]]
script = ExtResource( 2 )

[node name="CSGMesh" type="CSGMesh" parent="."]
transform = Transform( 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0.05, 0 )
mesh = SubResource( 1 )
material = ExtResource( 1 )

[node name="CSGMesh" type="CSGMesh" parent="CSGMesh"]
transform = Transform( 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0.0547492, 0 )
mesh = SubResource( 2 )
material = ExtResource( 1 )

[node name="Area" type="Area" parent="."]
collision_layer = 0

[node name="CollisionShape" type="CollisionShape" parent="Area"]
transform = Transform( 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0.0625423, 0 )
shape = SubResource( 3 )
[connection signal="area_entered" from="Area" to="." method="_on_collision"]
        GDSC      
      @     ������ڶ   ���Ҷ���   ���Ҷ���   �����¶�   �����Ŷ�   ��Ѷ   ���Ŷ���   �����϶�   ߶��   ڶ��   �������Ӷ���   �����¶�   �������ض���   ϶��   ζ��   ̶��   Ą��   ����������ض   ��������Ҷ��   ��������ݶ��   �������Ŷ���   ����׶��   ���Ӷ���   �������Ӷ���   ��¶   ���������¶�   ��������   ��������Ӷ��   �������������������۶���   �����ض�            ?        �������?      res://leg.tscn                     A  ffffff�?   �                                                    "   	   (   
   )      /      :      C      f      }      �      �      �      �      �      �      �      �      �                $     %     >     3YY;�  Y;�  �  Y;�  Z�  Y;�  �  YY;�  ?P�  QY;�  LMYY0�  PQV�  )�  �K  P�  R�  QV�  ;�	  �  T�
  PQ�  �	  T�  �  PP�  �  ZQ�  R�  R�  P�  �  ZQ�  Q�  �	  T�  T�  Z�	  P�	  T�  T�  R�	  T�  T�  Q�  ;�  �  �  �	  T�  �  PP�  �  ZQ�  R�  R�  P�  �  ZQ�  Q�  �  P�	  Q�  �  T�  P�	  QYY0�  P�  QV�  )�  �K  P�  T�  PQQV�  ;�	  �  L�  M�  &�	  T�  PQ�  �	  T�  PQ	�  �  P�	  T�  PQQ�  �&  PQ�	  �  V�  ;�  �  P�  T�  P�  �  ZQ�  R�  R�  T�  �  P�  �  ZQ�  Q�  �  �	  T�  �  Y�  W�  T�  P�  P�  RW�  T�  PQT�  T�  R�  QQY`            [gd_scene load_steps=9 format=2]

[ext_resource path="res://spider.gd" type="Script" id=1]
[ext_resource path="res://eyes.tres" type="Material" id=2]
[ext_resource path="res://black.tres" type="Material" id=3]
[ext_resource path="res://grey.tres" type="Material" id=4]

[sub_resource type="SphereMesh" id=1]
material = ExtResource( 3 )
radius = 0.4
height = 0.4

[sub_resource type="SphereMesh" id=2]
material = ExtResource( 2 )
radius = 0.1
height = 0.2

[sub_resource type="CylinderMesh" id=3]
material = ExtResource( 4 )
top_radius = 0.3
bottom_radius = 0.3
height = 0.001

[sub_resource type="CylinderShape" id=4]
radius = 0.399837
height = 0.1

[node name="Spider" type="Spatial"]
transform = Transform( 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0.968245, 0 )
script = ExtResource( 1 )

[node name="Head" type="CSGMesh" parent="."]
transform = Transform( 1, 0, 0, 0, 1, 0, 0, 0, 1, 0.00606954, -1.19209e-07, 0.00109792 )
mesh = SubResource( 1 )

[node name="Eye1" type="CSGMesh" parent="."]
transform = Transform( 1, 0, 0, 0, 1, 0, 0, 0, 1, -0.12976, 0.150128, 0.170982 )
mesh = SubResource( 2 )

[node name="Eye2" type="CSGMesh" parent="."]
transform = Transform( 1, 0, 0, 0, 1, 0, 0, 0, 1, 0.117821, 0.150128, 0.167108 )
mesh = SubResource( 2 )

[node name="Shadow" type="CSGMesh" parent="."]
transform = Transform( 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, -0.677674, 0 )
mesh = SubResource( 3 )

[node name="Area" type="Area" parent="."]

[node name="CollisionShape" type="CollisionShape" parent="Area"]
shape = SubResource( 4 )
      [gd_resource type="SpatialMaterial" format=2]

[resource]
albedo_color = Color( 0.133333, 0.305882, 0.176471, 1 )
              [remap]

path="res://game.gdc"
 [remap]

path="res://leg.gdc"
  [remap]

path="res://main.gdc"
 [remap]

path="res://person.gdc"
               [remap]

path="res://spider.gdc"
               ECFG      _global_script_classes             _global_script_class_icons             application/config/name         Hungry Spider      application/run/main_scene         res://main.tscn    autoload/game         *res://game.gd     display/window/size/width      �     display/window/size/height      8     display/window/stretch/mode         viewport   display/window/stretch/aspect         keep
   input/left�              deadzone      ?      events              InputEventKey         resource_local_to_scene           resource_name             device            alt           shift             control           meta          command           pressed           scancode        unicode           echo          script            InputEventKey         resource_local_to_scene           resource_name             device            alt           shift             control           meta          command           pressed           scancode   A      unicode           echo          script         input/right�              deadzone      ?      events              InputEventKey         resource_local_to_scene           resource_name             device            alt           shift             control           meta          command           pressed           scancode        unicode           echo          script            InputEventKey         resource_local_to_scene           resource_name             device            alt           shift             control           meta          command           pressed           scancode   D      unicode           echo          script         input/up�              deadzone      ?      events              InputEventKey         resource_local_to_scene           resource_name             device            alt           shift             control           meta          command           pressed           scancode        unicode           echo          script            InputEventKey         resource_local_to_scene           resource_name             device            alt           shift             control           meta          command           pressed           scancode   W      unicode           echo          script      
   input/down�              deadzone      ?      events              InputEventKey         resource_local_to_scene           resource_name             device            alt           shift             control           meta          command           pressed           scancode        unicode           echo          script            InputEventKey         resource_local_to_scene           resource_name             device            alt           shift             control           meta          command           pressed           scancode   S      unicode           echo          script         input/lower�              deadzone      ?      events              InputEventKey         resource_local_to_scene           resource_name             device            alt           shift             control           meta          command           pressed           scancode          unicode           echo          script            InputEventMouseButton         resource_local_to_scene           resource_name             device            alt           shift             control           meta          command           button_mask           position              global_position               factor       �?   button_index         pressed           doubleclick           script         input/higher�              deadzone      ?      events              InputEventMouseButton         resource_local_to_scene           resource_name             device            alt           shift             control           meta          command           button_mask           position              global_position               factor       �?   button_index         pressed           doubleclick           script      )   rendering/quality/directional_shadow/size      �              