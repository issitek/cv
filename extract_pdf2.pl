#!/usr/bin/perl
# Extracción avanzada de PDF

use strict;
use warnings;
use Encode;

my $pdf_file = $ARGV[0] || '/home/dev/share/html/cv/CV.pdf';

open(my $fh, '<:raw', $pdf_file) or die "No se puede abrir: $!";
my $data = do { local $/; <$fh> };
close($fh);

print "=== ANÁLISIS DEL PDF ===\n\n";

# Extraer metadatos
if ($data =~ /\/Producer \(([^)]+)\)/) {
    print "Productor: $1\n";
}
if ($data =~ /\/CreationDate \(([^)]+)\)/) {
    print "Fecha creación: $1\n";
}
if ($data =~ /\/ModDate \(([^)]+)\)/) {
    print "Fecha modificación: $1\n";
}

# Extraer texto de múltiples formatos
my @text_parts;

# Buscar texto entre paréntesis (formato PDF Tj o TJ)
while ($data =~ /\(([^()]{3,}?)\)/gs) {
    my $text = $1;
    
    # Limpiar escapes
    $text =~ s/\\([\\()nrtbf])/$1 eq 'n' ? "\n" : $1 eq 'r' ? "\r" : $1 eq 't' ? "\t" : $1/eg;
    $text =~ s/\\([0-7]{1,3})/chr(oct($1))/eg;
    
    # Filtrar solo texto legible
    if ($text =~ /[a-zA-ZÁÉÍÓÚáéíóúÑñ]{2,}/ && $text !~ /[^\x00-\x7F\xC0-\xFF]/) {
        push @text_parts, $text;
    }
}

# Buscar también en formato hex
while ($data =~ /<([0-9A-Fa-f\s]{10,})>/gs) {
    my $hex = $1;
    $hex =~ s/\s//g;
    my $decoded = pack('H*', $hex);
    
    if ($decoded =~ /[a-zA-ZÁÉÍÓÚáéíóúÑñ]{2,}/) {
        $decoded =~ s/[^\x20-\x7E\xC0-\xFF\s]//g;
        push @text_parts, $decoded if length($decoded) > 3;
    }
}

print "\n=== TEXTO EXTRAÍDO ===\n\n";

# Unir y limpiar
my $full_text = join(' ', @text_parts);
$full_text =~ s/\s+/ /g;
$full_text =~ s/([^\p{L}\p{N}\s])/$1 eq ' ' ? ' ' : ''/ge;

# Mostrar líneas con contenido
my @lines = split /\s{2,}/, $full_text;
foreach my $line (@lines) {
    $line =~ s/^\s+|\s+$//g;
    if (length($line) > 5 && $line =~ /[A-Z][a-z]/) {
        print $line . "\n";
    }
}

print "\n=== TEXTO COMPLETO ===\n\n";
print $full_text;
print "\n\n=== FIN ===\n";
