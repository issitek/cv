#!/usr/bin/perl
# Script para extraer texto de PDF sin dependencias externas

use strict;
use warnings;

my $pdf_file = $ARGV[0] || '/home/dev/share/html/cv/CV.pdf';

if (!-f $pdf_file) {
    die "Archivo no encontrado: $pdf_file\n";
}

open(my $fh, '<:raw', $pdf_file) or die "No se puede abrir $pdf_file: $!";

my $content = '';
my $in_text = 0;
my $text_buffer = '';

while (my $line = <$fh>) {
    # Buscar marcadores de texto en PDF
    if ($line =~ /stream/) {
        $in_text = 1;
        next;
    }
    if ($line =~ /endstream/) {
        $in_text = 0;
        next;
    }
    
    # Extraer texto entre paréntesis (formato PDF)
    while ($line =~ /\(([^)]+)\)/g) {
        my $text = $1;
        # Limpiar escapes comunes en PDF
        $text =~ s/\\\(/(/g;
        $text =~ s/\\\)/)/g;
        $text =~ s/\\\\/\\/g;
        $text =~ s/\\n/\n/g;
        $text =~ s/\\r/\r/g;
        $text =~ s/\\t/\t/g;
        
        # Solo agregar si parece texto legible
        if ($text =~ /[a-zA-Z]{2,}/ && length($text) > 2) {
            $text_buffer .= $text . " ";
        }
    }
}

close($fh);

# Limpiar y formatear el texto extraído
$text_buffer =~ s/\s+/ /g;
$text_buffer =~ s/[^\x20-\x7E\xA0-\xFF\n]//g;

print "=== TEXTO EXTRAÍDO DEL PDF ===\n\n";
print $text_buffer;
print "\n\n=== FIN DEL TEXTO ===\n";

# Guardar en archivo
my $output_file = '/home/dev/share/html/cv/cv_text.txt';
open(my $out, '>:utf8', $output_file) or die "No se puede escribir $output_file: $!";
print $out $text_buffer;
close($out);

print "\nTexto guardado en: $output_file\n";
