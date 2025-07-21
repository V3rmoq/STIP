<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:output method="xml" indent="yes"/>
    <xsl:template match="/cookbook">
        <cookbook>
            <xsl:for-each select="dish[type='Десерт']">
                <xsl:copy-of select="."/>
            </xsl:for-each>
        </cookbook>
    </xsl:template>
</xsl:stylesheet>